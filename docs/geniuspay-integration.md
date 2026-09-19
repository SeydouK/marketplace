# Intégration GeniusPay — BétailMarket

Documentation opérationnelle : mise en place du webhook, parcours de paiement,
et traçabilité complète du montant. Rédigé le 2026-08-19 après validation en sandbox.

- **Doc officielle** : https://pay.genius.ci/docs/api
- **Dashboard** : https://pay.genius.ci/dashboard
- **Support** : support@genius.ci

---

## 1. Configuration

Toute la config passe par des variables d'environnement, lues dans
`backend/src/main/resources/application.properties` (lignes 46-52) et mappées par
`GeniusPayProperties`.

| Variable | Rôle | Format réel |
|---|---|---|
| `GENIUSPAY_BASE_URL` | Base de l'API marchand | `https://pay.genius.ci/api/v1/merchant` |
| `GENIUSPAY_API_KEY` | Header `X-API-Key` | `sk_sandbox_…` / `sk_live_…` |
| `GENIUSPAY_API_SECRET` | Header `X-API-Secret` | `ss_sandbox_…` / `ss_live_…` |
| `GENIUSPAY_WEBHOOK_SECRET` | Vérification HMAC des webhooks | `whsec_…` |
| `GENIUSPAY_WALLET_ID` | Source des versements vendeurs | UUID (non utilisé, voir §5) |

> **Attention** : la doc officielle annonce `pk_…` pour `X-API-Key` et `sk_…` pour
> `X-API-Secret`. Les clés réellement délivrées sont `sk_…` et `ss_…`, et elles
> authentifient correctement. La doc est périmée sur ce point.

> `.env` est lu comme un fichier `.properties`. Il ne doit **pas** avoir de BOM UTF-8 :
> le BOM corromprait la première clé du fichier. Éviter `Set-Content -Encoding utf8`
> sous PowerShell 5.1, qui en ajoute un.

**Déploiement** : `.env.prod` et `.env.prod.example` ne contiennent pas encore les
variables `GENIUSPAY_*`. `application-prod.properties` hérite de la config de base,
il suffit donc de définir les 4 variables sur l'hébergeur.

---

## 2. Créer le webhook et récupérer son secret

Le secret `whsec_…` **n'est renvoyé qu'à la création**. Il est irrécupérable ensuite :
si on le perd, il faut supprimer le webhook et en créer un nouveau.

Inutile de chercher dans le dashboard — l'API suffit.

### Endpoints disponibles

```
GET    /webhooks              lister
POST   /webhooks              créer   ← le secret est renvoyé ICI
PUT    /webhooks/{id}         modifier
DELETE /webhooks/{id}         supprimer
POST   /webhooks/{id}/test    déclencher une livraison de test (0 token)
```

### 2.1 — Vérifier l'existant

```bash
curl -s https://pay.genius.ci/api/v1/merchant/webhooks \
  -H "X-API-Key: $GENIUSPAY_API_KEY" \
  -H "X-API-Secret: $GENIUSPAY_API_SECRET"
```

Réponse quand rien n'est enregistré :

```json
{"success":true,"data":[]}
```

### 2.2 — Exposer le backend local (dev uniquement)

GeniusPay appelle depuis Internet : `localhost` est injoignable. En dev, tunnel ngrok.

```bash
ngrok config add-authtoken <TON_AUTHTOKEN>   # une seule fois
ngrok http 8080
```

L'URL publique se récupère sur l'API locale d'ngrok :

```bash
curl -s http://127.0.0.1:4040/api/tunnels
```

> ngrok exige une version d'agent récente (≥ 3.20). Le paquet winget livre une 3.3.1
> trop ancienne : lancer `ngrok update` juste après l'installation.
>
> En offre gratuite **l'URL change à chaque redémarrage du tunnel** — il faut alors
> mettre à jour ou recréer le webhook côté GeniusPay.

### 2.3 — Créer le webhook

```bash
curl -s -X POST https://pay.genius.ci/api/v1/merchant/webhooks \
  -H "X-API-Key: $GENIUSPAY_API_KEY" \
  -H "X-API-Secret: $GENIUSPAY_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://<sous-domaine>.ngrok-free.app/api/paiements/webhook/geniuspay",
    "description": "BetailMarket - dev local via ngrok",
    "events": [
      "payment.initiated","payment.success","payment.failed",
      "payment.cancelled","payment.refunded","payment.expired",
      "cashout.requested","cashout.approved","cashout.completed","cashout.failed"
    ]
  }'
```

Réponse `201` — **copier `data.secret` immédiatement** dans `GENIUSPAY_WEBHOOK_SECRET` :

```json
{"success":true,"data":{"id":4137,"url":"…","events":[…],"secret":"whsec_…"}}
```

Redémarrer le backend pour qu'il charge le secret.

### 2.4 — Tester sans dépenser de token

```bash
curl -s -X POST https://pay.genius.ci/api/v1/merchant/webhooks/4137/test \
  -H "X-API-Key: $GENIUSPAY_API_KEY" \
  -H "X-API-Secret: $GENIUSPAY_API_SECRET" \
  -H "Content-Type: application/json" -d '{}'
```

Un succès ressemble à ceci — `status_code: 200` signifie que la signature a été acceptée :

```json
{"success":true,"data":{"success":true,"status_code":200,"response_time":1067,"body":""}}
```

Le payload réellement reçu :

```json
{
  "id": "ac0edaa5-…", "event": "webhook.test", "timestamp": 1787161471,
  "created_at": "2026-08-19T17:44:31.028038Z",
  "data": { "object": "webhook.test", "message": "…", "webhook_id": 4137,
            "environment": "sandbox" },
  "environment": "sandbox", "api_version": "2024-01-01"
}
```

### 2.5 — Nettoyer

Un webhook pointant sur une URL ngrok morte reste enregistré et accumule des échecs :

```bash
curl -s -X DELETE https://pay.genius.ci/api/v1/merchant/webhooks/4137 \
  -H "X-API-Key: $GENIUSPAY_API_KEY" \
  -H "X-API-Secret: $GENIUSPAY_API_SECRET"
```

---

## 3. Sécurité du webhook

Signature envoyée dans le header `X-Webhook-Signature` :

```
signature = HMAC-SHA256(timestamp + "." + corps_brut, webhook_secret)   → hex minuscule
```

Le `timestamp` est celui du header `X-Webhook-Timestamp` (epoch secondes).

Points d'implémentation (`GeniusPayService.verifyWebhookSignature`) :

- **Signer le corps brut**, jamais un JSON re-sérialisé. D'où le `@RequestBody String rawBody`
  dans `PaiementController` — une désérialisation puis re-sérialisation changerait les octets
  et invaliderait la signature.
- Comparaison en temps constant (`MessageDigest.isEqual`).
- Tolérance anti-rejeu de **300 s** sur le timestamp.
- Signature invalide → `401`. GeniusPay ne réessaie que sur `5xx`/timeout, donc un `401`
  ne déclenche pas de tempête de retries.

Rythme des retries GeniusPay en cas d'échec : immédiat, 5 min, 30 min, 2 h, 6 h.

L'endpoint est public (`SecurityConfig` : `POST /api/paiements/webhook/**` en `permitAll`),
la signature est le seul contrôle d'accès.

---

## 4. Parcours de paiement et traçabilité du montant

### 4.1 — Vue d'ensemble

```
Panier                POST /api/paiements/commandes
  │                          │
  │                          ├─ calcule montant, frais, commission
  │                          ├─ crée Commande (EN_ATTENTE) + CommandeItems
  │                          └─ POST GeniusPay /payments ──► reference + checkout_url
  ▼
Redirection vers checkout_url (page GeniusPay)
  │
  ├── l'acheteur paie ──► redirection vers success_url
  │                        /paiement/retour?status=success&commandeId=N
  │
  ├── (A) webhook  POST /api/paiements/webhook/geniuspay   ← chemin nominal
  └── (B) réconciliation GET /payments/{reference}          ← filet de sécurité
              déclenchée par le polling du front sur GET /commandes/{id}

  Le premier des deux qui aboutit :
      statut = PAYEE, paidAt renseigné
      panier vidé
      versements générés (un par vendeur, statut EN_ATTENTE)
```

Les deux chemins partagent `PaiementService.appliquerPaiementReussi`. La transition
`EN_ATTENTE → PAYEE` passe par un `UPDATE … WHERE statut = EN_ATTENTE`
(`CommandeRepository.marquerPayeeSiEnAttente`) : seul l'appel qui modifie réellement la
ligne joue les effets de bord. Sans cela, webhook et réconciliation concurrents
généreraient des versements en double.

### 4.2 — Ce qui est envoyé à GeniusPay

`POST /api/v1/merchant/payments`

```json
{
  "amount": 180000,
  "description": "Commande #12",
  "metadata": { "order_id": "12" },
  "success_url": "http://localhost:4200/paiement/retour?status=success&commandeId=12",
  "error_url":   "http://localhost:4200/paiement/retour?status=error&commandeId=12"
}
```

- `amount` est le **montant total du panier**, pas le net vendeur. GeniusPay encaisse
  la totalité ; la répartition est interne à BétailMarket.
- Aucune donnée acheteur n'est transmise (les champs `customer.*` existent mais ne sont
  pas utilisés).
- `metadata.order_id` est renvoyé tel quel dans le webhook : il sert de repli si la
  référence ne correspond à aucune commande.
- Montant minimum imposé par GeniusPay : **200 XOF**.

Réponse utile : `data.reference` et `data.checkout_url`, tous deux stockés sur la commande.

### 4.3 — Traçabilité du montant

**Au niveau du panier** (`PanierItem.getSousTotal`, `Panier.getTotal`) :

```
sousTotal(item) = prixUnitaire × quantite
montant         = Σ sousTotal
```

**À la création de la commande** (`PaiementService`, constantes lignes 46-49) :

```
fraisGeniusPay       = arrondi(montant × 1 %  + 100)      TAUX_GENIUSPAY + FRAIS_FIXE
commissionPlateforme = arrondi(montant × 3 %)             TAUX_COMMISSION_PLATEFORME
montantNetVendeur    = montant − fraisGeniusPay − commissionPlateforme
```

Arrondi `HALF_UP`, 0 décimale (le XOF n'a pas de centimes).

Ces 4 valeurs sont figées en base sur la ligne `commandes` — elles ne sont jamais
recalculées ensuite, ce qui garantit qu'un changement de barème n'altère pas
l'historique.

**À la répartition entre vendeurs** (`VersementService.genererVersements`, après paiement) :

```
montantBrutVendeur = Σ sousTotal des articles de CE vendeur
part               = montantBrutVendeur / commande.montant        (10 décimales)
fraisAlloue        = arrondi(commande.fraisGeniusPay       × part)
commissionAlloue   = arrondi(commande.commissionPlateforme × part)
montantNet         = montantBrutVendeur − fraisAlloue − commissionAlloue
```

Une ligne `versements` par vendeur, statut initial `EN_ATTENTE`.

### 4.4 — Exemple chiffré

Panier à un seul article : 1 × « Tabaski » à 180 000 XOF, vendeur unique.

| Poste | Calcul | Montant |
|---|---|---|
| Montant panier | 180 000 × 1 | **180 000** |
| Frais GeniusPay | 180 000 × 1 % + 100 | 1 900 |
| Commission plateforme | 180 000 × 3 % | 5 400 |
| Net vendeur | 180 000 − 1 900 − 5 400 | **172 700** |

Encaissé par GeniusPay : 180 000. Retenu par la plateforme : 5 400.
Dû au vendeur : 172 700.

Avec deux vendeurs, `part` répartit frais et commission au prorata du brut de chacun.

> **Limite connue** : frais et commission sont arrondis *indépendamment pour chaque
> vendeur*. La somme des `montantNet` des versements peut donc s'écarter de
> `commande.montantNetVendeur` de quelques XOF sur des commandes multi-vendeurs.
> À surveiller lors du rapprochement comptable.

### 4.5 — Statuts

`StatutCommande` : `EN_ATTENTE` → `PAYEE` | `ECHOUEE` | `ANNULEE` | `EXPIREE`

| Événement webhook | Statut GeniusPay (API) | Statut commande |
|---|---|---|
| `payment.success` | `completed` | `PAYEE` |
| `payment.failed` | `failed` | `ECHOUEE` |
| `payment.cancelled` | — | `ANNULEE` |
| `payment.expired` | `expired` | `EXPIREE` |
| — | `pending` / `processing` | inchangé |

`StatutVersement` : `EN_ATTENTE` → `EN_COURS` → `CONFIRME` | `ECHOUE`

---

## 5. Points non résolus

### 5.1 — Le barème de frais n'est pas vérifié

La formule **1 % + 100 XOF** est une hypothèse codée en dur. Éléments contradictoires :

- L'exemple de la doc officielle donne `fees: 450` pour `amount: 15000`, soit **3 %**.
- Le sandbox renvoie `fees: 0` et `net_amount = amount` : il ne calcule aucun frais,
  donc il ne permet pas de trancher.
- L'API **retourne** `fees` et `net_amount` dans ses réponses — ces valeurs font autorité
  et sont actuellement ignorées par le code.

Comme `montantNetVendeur` en dépend, un barème erroné se traduit par des versements faux.
**À confirmer auprès de GeniusPay avant toute mise en production.**

### 5.2 — L'API de versement n'est pas documentée

`GeniusPayService.initiatePayout` poste sur `/payouts` avec `wallet_id`, `recipient`,
`destination`, `idempotency_key`. **Rien de tout cela n'apparaît dans la doc officielle** :
aucun endpoint, aucun corps de requête, aucune réponse. Ce code est une hypothèse.

Seuls les *événements* sont documentés, et ils s'appellent `cashout.*` — ce qui suggère
que l'endpoint réel est plutôt `/cashouts`. Les noms d'événements ont été validés
indirectement : l'API les a acceptés à la création du webhook.

L'envoi effectif d'un versement reste de toute façon une **action manuelle d'un admin**
(`VersementService.envoyerVersement`), par choix : un humain valide avant que de l'argent
réel ne parte vers un tiers.

### 5.3 — Le champ `Animal.owner` est mort

Le vendeur d'un animal se lit dans `animal_vendeur` (entité `AnimalSeller`), source
canonique dans toute l'application. `Animal.owner` / `owner_id` est un vestige, `NULL`
partout. `PanierService` le lisait encore et laissait `vendeurId` à `null` sans erreur —
ce qui ne cassait qu'au moment du paiement. Corrigé, mais le champ mort subsiste en base.
