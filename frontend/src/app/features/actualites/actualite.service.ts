import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Actualite } from './actualite.model';

const STORAGE_KEY = 'actualites_last_seen';

const DUMMY_ACTUALITES: Actualite[] = [
  {
    id: '1',
    titre: 'Alerte : Foyer de fièvre aphteuse signalé dans la région de Korhogo',
    resume: 'Les services vétérinaires du MIRAH signalent un foyer de fièvre aphteuse affectant des bovins dans plusieurs villages de la sous-préfecture de Korhogo. Les éleveurs sont invités à la vigilance.',
    contenu: `Les services vétérinaires du Ministère des Ressources Animales et Halieutiques (MIRAH) ont confirmé la présence d'un foyer de fièvre aphteuse dans la région du Poro, précisément dans plusieurs villages de la sous-préfecture de Korhogo.

Les animaux affectés présentent des lésions buccales, une hypersalivation et une boiterie marquée. Le MIRAH a mis en place un périmètre de surveillance et des équipes de vaccination d'urgence ont été déployées sur le terrain.

**Recommandations pour les éleveurs :**
- Éviter tout déplacement de bovins depuis ou vers les zones identifiées
- Signaler immédiatement tout animal présentant des symptômes suspects au service vétérinaire local
- S'assurer que les animaux sont à jour de leurs vaccinations

Contact MIRAH Korhogo : +225 36 86 XX XX`,
    categorie: 'SANTE_ANIMALE',
    auteur: 'Équipe BétailMarket',
    datePublication: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isNew: true,
  },
  {
    id: '2',
    titre: 'Prix du bétail : la demande monte à l\'approche de la Tabaski 2025',
    resume: 'Comme chaque année, le marché du bétail s\'anime fortement à l\'approche de la fête de l\'Aïd el-Kébir. Les prix des ovins connaissent une hausse de 15 à 25 % sur les marchés d\'Abidjan.',
    contenu: `À deux semaines de la Tabaski (Aïd el-Kébir), les marchés à bétail d'Abidjan et des grandes villes de Côte d'Ivoire enregistrent une forte affluence. Les prix des moutons, particulièrement les races Djallonké et Peulh, sont en hausse significative.

**Relevé de prix observés sur le marché d'Abobo-gare (semaine du 16 juin 2025) :**
- Mouton Djallonké (20–30 kg) : 75 000 – 120 000 FCFA
- Mouton Peulh (30–45 kg) : 130 000 – 200 000 FCFA
- Bélier de prestige (>50 kg) : 250 000 – 400 000 FCFA

Les éleveurs du nord (Korhogo, Ferkessédougou) anticipent une forte demande et organisent des convois vers Abidjan dès cette semaine. Les acheteurs sont conseillés de ne pas attendre les derniers jours pour éviter la pression tarifaire.`,
    categorie: 'MARCHE',
    auteur: 'Équipe BétailMarket',
    datePublication: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isNew: true,
  },
  {
    id: '3',
    titre: 'Bien nourrir ses bovins en saison sèche : les conseils de nos vétérinaires',
    resume: 'La saison sèche est une période critique pour l\'alimentation du bétail. Voici les pratiques recommandées pour maintenir la condition corporelle de vos animaux et prévenir les pertes.',
    contenu: `La saison sèche représente un défi majeur pour les éleveurs de bovins en Côte d'Ivoire. La raréfaction des pâturages naturels expose les animaux à des carences nutritionnelles qui affectent leur productivité, leur immunité et leur valeur marchande.

**Stratégies d'alimentation recommandées :**

**1. La complémentation alimentaire**
Distribuez des sous-produits agro-industriels disponibles localement : son de riz, tourteau de coton, drèches de brasserie. Ces aliments sont riches en énergie et protéines à coût réduit.

**2. La fenaison et l'ensilage**
Constituez des réserves fourragères en saison des pluies. Le foin de Brachiaria et le maïs ensilé permettent de traverser la saison sèche sans pertes de poids excessives.

**3. L'abreuvement**
Un bovin adulte consomme entre 30 et 50 litres d'eau par jour. Assurez un accès permanent à une eau propre — la déshydratation est souvent la première cause de baisse de production.

**4. La complémentation minérale**
Le manque de phosphore et de calcium est fréquent en saison sèche. Des blocs à lécher (pierres à sel enrichies) placés dans les enclos corrigent ces déficits à faible coût.`,
    categorie: 'ELEVAGE',
    auteur: 'Dr Kouamé Yao, Vétérinaire',
    datePublication: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isNew: false,
  },
  {
    id: '4',
    titre: 'Nouvelle réglementation : obligations sanitaires pour le transport inter-régional de bétail',
    resume: 'Le MIRAH a mis à jour les textes régissant le transport d\'animaux vivants entre les régions. Le laissez-passer sanitaire devient obligatoire pour tout lot de plus de 5 têtes.',
    contenu: `Le Ministère des Ressources Animales et Halieutiques (MIRAH) a publié le décret n°2025-412 du 10 mai 2025, qui renforce les obligations sanitaires liées au transport inter-régional d'animaux d'élevage en Côte d'Ivoire.

**Principales dispositions :**

**Laissez-passer sanitaire obligatoire**
Tout lot de plus de 5 têtes (bovins, ovins, caprins) doit être accompagné d'un laissez-passer sanitaire délivré par un vétérinaire ou un agent de l'élevage agréé. Ce document doit mentionner : l'origine du troupeau, le nombre et l'espèce des animaux, l'état sanitaire général, les vaccinations réalisées dans les 30 jours précédents.

**Contrôles renforcés aux barrières**
Des points de contrôle vétérinaire sont désormais opérationnels sur les axes Abidjan–Bouaké, Bouaké–Korhogo et Abidjan–Daloa. Les camions transportant du bétail sans laissez-passer peuvent être interceptés et les animaux mis en quarantaine.

**Sanctions**
Les infractions sont passibles d'une amende de 50 000 à 500 000 FCFA selon la gravité.`,
    categorie: 'REGLEMENTATION',
    auteur: 'Équipe BétailMarket',
    datePublication: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    isNew: false,
  },
  {
    id: '5',
    titre: 'Vaccination Newcastle : programme gratuit pour les aviculteurs de la région des Lagunes',
    resume: 'L\'ANADER et le MIRAH lancent une campagne de vaccination gratuite contre la maladie de Newcastle pour les petits aviculteurs de la région des Lagunes, du 1er au 30 juillet 2025.',
    contenu: `Dans le cadre du Programme National de Développement de l'Aviculture Villageoise (PNDAV), l'ANADER en partenariat avec le MIRAH organise une campagne de vaccination gratuite contre la maladie de Newcastle (maladie très contagieuse et souvent mortelle pour la volaille).

**Qui est concerné ?**
Tous les aviculteurs de la région des Lagunes disposant d'un effectif inférieur à 500 sujets (poules, pintades, dindes, canards).

**Où et quand se faire vacciner ?**
Les équipes mobiles se déplaceront dans les sous-préfectures selon le calendrier suivant :
- Semaine 1 (1–5 juillet) : Songon, Jacqueville, Grand-Lahou
- Semaine 2 (8–12 juillet) : Dabou, Tiassalé
- Semaine 3 (15–19 juillet) : Aboisso, Adiaké
- Semaine 4 (22–30 juillet) : Sessions de rattrapage sur demande

**Comment bénéficier du programme ?**
Contacter votre antenne ANADER locale ou vous inscrire directement auprès des équipes sur le terrain. Aucun document spécial n'est requis.`,
    categorie: 'CONSEIL',
    auteur: 'ANADER Côte d\'Ivoire',
    datePublication: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    isNew: false,
  },
];

@Injectable({ providedIn: 'root' })
export class ActualiteService {
  private readonly actualites = DUMMY_ACTUALITES;

  /** Date à laquelle l'utilisateur a vu les actualités pour la dernière fois */
  private lastSeenDate: Date = this.loadLastSeen();

  private readonly _hasNewActualites = new BehaviorSubject<boolean>(this.computeHasNew());
  readonly hasNewActualites$: Observable<boolean> = this._hasNewActualites.asObservable();

  private readonly _hasNewServices = new BehaviorSubject<boolean>(true);
  readonly hasNewServices$: Observable<boolean> = this._hasNewServices.asObservable();

  getAll(): Actualite[] {
    return [...this.actualites].sort(
      (a, b) => b.datePublication.getTime() - a.datePublication.getTime()
    );
  }

  getById(id: string): Actualite | undefined {
    return this.actualites.find(a => a.id === id);
  }

  /** Appelé quand l'utilisateur ouvre la page Actualités */
  markAllAsSeen(): void {
    this.lastSeenDate = new Date();
    localStorage.setItem(STORAGE_KEY, this.lastSeenDate.toISOString());
    this._hasNewActualites.next(false);
  }

  /** Appelé quand l'utilisateur visite Services */
  markServicesAsSeen(): void {
    this._hasNewServices.next(false);
  }

  private computeHasNew(): boolean {
    return this.actualites.some(
      a => a.datePublication > this.lastSeenDate
    );
  }

  private loadLastSeen(): Date {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Date(stored) : new Date(0);
  }

  getCategorieLabel(cat: string): string {
    const labels: Record<string, string> = {
      SANTE_ANIMALE:  'Santé animale',
      ELEVAGE:        'Élevage',
      MARCHE:         'Marché',
      REGLEMENTATION: 'Réglementation',
      CONSEIL:        'Conseils pratiques',
    };
    return labels[cat] ?? cat;
  }

  getCategorieColor(cat: string): string {
    const colors: Record<string, string> = {
      SANTE_ANIMALE:  'bg-red-100 text-red-700',
      ELEVAGE:        'bg-[#F2F7F3] text-[#2D6A4F]',
      MARCHE:         'bg-amber-100 text-amber-700',
      REGLEMENTATION: 'bg-blue-100 text-blue-700',
      CONSEIL:        'bg-purple-100 text-purple-700',
    };
    return colors[cat] ?? 'bg-gray-100 text-gray-700';
  }
}
