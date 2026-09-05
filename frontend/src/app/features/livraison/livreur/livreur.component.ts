// livraison/livreur/livreur.component.ts
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LivraisonService, SuiviLivraison } from '../../../shared/services/livraison.service';
import { LeafletLoaderService } from '../../../shared/services/leaflet-loader.service';
import { ToastService } from '../../../core/services/toast.service';
import { EtatSuivi, PositionTrackerService } from '../services/position-tracker.service';
import { Itineraire, ItineraireService } from '../services/itineraire.service';
import { NavigationService } from '../services/navigation.service';

/**
 * L'écran que le livreur garde ouvert pendant qu'il conduit.
 *
 * <p>La navigation se fait <strong>dans</strong> l'application. Un bouton vers
 * l'application de cartes du téléphone paraissait pratique, mais il interrompait
 * la fonction principale : dès que l'onglet passe en arrière-plan, le navigateur
 * suspend la géolocalisation, et l'acheteur perd le suivi sans comprendre
 * pourquoi. Route, distance et consignes sont donc affichées ici.
 *
 * <p>Conçu pour être utilisable d'un pouce, en plein soleil, sur un téléphone
 * d'entrée de gamme : une action principale à la fois, de grandes cibles, et un
 * état de transmission toujours visible.
 */
@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  standalone: false,
  providers: [PositionTrackerService],
})
export class LivreurComponent implements OnInit, OnDestroy {
  private carteHote?: ElementRef<HTMLDivElement>;

  /** Le conteneur vit sous un *ngIf : un setter le capte quand il paraît. */
  @ViewChild('carte') set carteRef(element: ElementRef<HTMLDivElement> | undefined) {
    if (!element) return;
    this.carteHote = element;
    this.preparerCarte();
  }

  remiseId!: number;
  suivi: SuiviLivraison | null = null;
  chargement = true;
  erreur = false;
  demarrageEnCours = false;

  etat: EtatSuivi = { actif: false, enAttente: 0 };

  /**
   * Champ rafraîchi par une minuterie, et non getter calculé : un getter
   * appelant Date.now() renvoie une valeur différente à chaque appel, ce
   * qu'Angular signale par NG0100 lors de sa passe de vérification.
   */
  secondesDepuisEnvoi: number | null = null;

  // ── Itinéraire ─────────────────────────────────────────────────────────────
  itineraire: Itineraire | null = null;
  itineraireIndisponible = false;
  etapesDepliees = false;

  /** Vrai le temps d'un recalcul — affiché pour que le silence ne passe pas pour une panne. */
  recalculEnCours = false;

  /**
   * Vrai quand le véhicule s'est écarté de l'itinéraire.
   *
   * Affiché brièvement, le temps du recalcul : sans ce mot, le livreur voit une
   * route qui ne correspond plus à ce qu'il a sous les yeux et ne sait pas si
   * l'application l'a remarqué.
   */
  horsItineraire = false;

  /**
   * Écart au-delà duquel on considère que la route n'est plus suivie.
   *
   * Quarante mètres, et non dix : le GPS d'un téléphone dérive, et une route à
   * deux chaussées séparées met déjà vingt mètres entre les deux sens. Trop bas,
   * on recalcule sans cesse une route que le livreur suit correctement.
   */
  private static readonly ECART_MAX_M = 40;

  /**
   * Nombre de relevés consécutifs hors route avant de recalculer.
   *
   * Un point isolé à cent mètres est presque toujours une erreur de mesure, pas
   * un changement de route. Trois de suite, c'est un fait.
   */
  private static readonly ECARTS_AVANT_RECALCUL = 3;

  /** Un recalcul par minute au plus : le serveur d'itinéraire est mutualisé et gratuit. */
  private static readonly DELAI_MIN_RECALCUL_MS = 60_000;

  /** Distance en deçà de laquelle une manœuvre est tenue pour franchie. */
  private static readonly SEUIL_ETAPE_M = 25;

  private ecartsConsecutifs = 0;
  private dernierRecalculMs = 0;
  private etapeCourante = 0;
  private distanceProchaineM: number | null = null;

  /**
   * Carte en plein ecran.
   *
   * Sur un telephone tenu a bout de bras dans un vehicule, une carte de 300 px
   * ne se lit pas. Le plein ecran est le mode normal en conduisant ; la vue
   * reduite sert a consulter le reste de la page.
   */
  pleinEcran = false;

  // ── Remise sur place ───────────────────────────────────────────────────────
  // Saisie directement ici : le transporteur n'a pas accès à « Mes ventes »,
  // et le vendeur qui conduit n'a aucune raison d'y retourner non plus.
  remiseOuverte = false;
  codeSaisi = '';
  photoFichier: File | null = null;
  photoApercu: string | null = null;
  remiseEnCours = false;

  private abonnement?: Subscription;
  private horloge?: ReturnType<typeof setInterval>;
  private L: any;
  private carte: any;
  private marqueurLivreur: any;
  private marqueurDestination: any;
  private ligneRoute: any;

  constructor(
    private route: ActivatedRoute,
    private livraisonService: LivraisonService,
    private tracker: PositionTrackerService,
    private leaflet: LeafletLoaderService,
    public itineraireService: ItineraireService,
    private navigation: NavigationService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.remiseId = Number(this.route.snapshot.paramMap.get('remiseId'));

    this.abonnement = this.tracker.etat$.subscribe((e) => {
      this.etat = e;
      this.majCompteur();
      this.majPositionSurCarte();
    });

    this.horloge = setInterval(() => this.majCompteur(), 1000);

    // Le navigateur suspend la géolocalisation quand l'onglet passe en
    // arrière-plan. Au retour, on relance sans rien demander : le livreur ne
    // doit pas avoir à y penser.
    document.addEventListener('visibilitychange', this.surRetour);

    this.charger();
    this.leaflet
      .charger()
      .then((L) => {
        this.L = L;
        this.preparerCarte();
      })
      .catch(() => {});
  }

  ngOnDestroy(): void {
    this.tracker.arreter();
    this.abonnement?.unsubscribe();
    if (this.horloge) clearInterval(this.horloge);
    document.removeEventListener('visibilitychange', this.surRetour);
    this.carte?.remove?.();
  }

  private surRetour = (): void => {
    if (document.visibilityState !== 'visible') return;
    if (
      this.suivi?.estLeLivreur &&
      this.suivi.departAt &&
      this.suivi.etat !== 'REMIS' &&
      !this.etat.actif
    ) {
      this.tracker.demarrer(this.remiseId);
    }
  };

  charger(): void {
    this.chargement = true;
    this.livraisonService.suivre(this.remiseId).subscribe({
      next: (suivi) => {
        this.suivi = suivi;
        this.chargement = false;
        if (suivi.estLeLivreur && suivi.departAt && suivi.etat !== 'REMIS') {
          this.tracker.demarrer(this.remiseId);
        }
        this.preparerCarte();
        this.calculerItineraire();
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  // ── Itinéraire ─────────────────────────────────────────────────────────────

  /**
   * Calcule la route depuis la position actuelle jusqu'à la destination.
   *
   * Un échec n'est jamais bloquant : l'adresse et les repères suffisent à livrer,
   * et le serveur d'itinéraire est une dépendance externe qu'on ne maîtrise pas.
   */
  private calculerItineraire(): void {
    const arrivee = this.pointDestination();
    const depart = this.pointLivreur();
    if (!arrivee || !depart) return;

    this.recalculEnCours = true;
    this.dernierRecalculMs = Date.now();

    this.itineraireService.calculer(depart, arrivee).subscribe({
      next: (it) => {
        this.recalculEnCours = false;

        // Une réponse arrivée après une plus récente est jetée : la garder
        // renverrait le livreur sur la route qu'il vient de quitter.
        if (this.itineraire && it.version < this.itineraire.version) return;

        this.itineraire = it;
        this.itineraireIndisponible = false;
        this.horsItineraire = false;
        this.ecartsConsecutifs = 0;
        this.etapeCourante = 0;
        this.majEtapeCourante();
        this.tracerRoute();
      },
      error: () => {
        this.recalculEnCours = false;
        this.itineraireIndisponible = true;
      },
    });
  }

  /**
   * Le véhicule suit-il encore l'itinéraire calculé ?
   *
   * <p>Appelée à chaque relevé. La mesure porte sur les segments de la route, pas
   * sur ses sommets : entre deux sommets distants de plusieurs centaines de
   * mètres, un véhicule parfaitement sur la voie paraîtrait très loin.
   *
   * <p>Le recalcul n'est pas déclenché au premier écart. Un point isolé à cent
   * mètres est presque toujours une dérive du GPS ; c'est la répétition qui
   * signale un vrai changement de route.
   */
  private verifierEcartItineraire(): void {
    const position = this.pointLivreur();
    if (!position || !this.itineraire?.points.length) return;

    const ecart = this.navigation.distanceAuTraceM(position, this.itineraire.points);

    if (ecart <= LivreurComponent.ECART_MAX_M) {
      this.ecartsConsecutifs = 0;
      this.horsItineraire = false;
      return;
    }

    this.ecartsConsecutifs++;
    if (this.ecartsConsecutifs < LivreurComponent.ECARTS_AVANT_RECALCUL) return;

    this.horsItineraire = true;

    // Bridage : sur une route parallèle non cartographiée, l'écart peut rester
    // durablement au-dessus du seuil. Sans ce délai, on demanderait un
    // itinéraire toutes les cinq secondes à un serveur public et gratuit.
    if (Date.now() - this.dernierRecalculMs < LivreurComponent.DELAI_MIN_RECALCUL_MS) return;

    this.ecartsConsecutifs = 0;
    this.calculerItineraire();
  }

  /**
   * Fait avancer la consigne affichée à mesure que les manœuvres sont franchies.
   *
   * Sans cela, l'écran répète « Départ » jusqu'à l'arrivée : la liste des étapes
   * est calculée une fois et rien ne la relie à la position réelle.
   */
  private majEtapeCourante(): void {
    const position = this.pointLivreur();
    const etapes = this.itineraire?.etapes;
    if (!position || !etapes?.length) {
      this.distanceProchaineM = null;
      return;
    }

    // On peut franchir plusieurs manœuvres entre deux relevés — deux virages
    // rapprochés, ou une reprise après un passage sans réseau.
    while (
      this.etapeCourante < etapes.length - 1 &&
      this.navigation.distanceM(position, etapes[this.etapeCourante].position)
        < LivreurComponent.SEUIL_ETAPE_M
    ) {
      this.etapeCourante++;
    }

    this.distanceProchaineM = Math.round(
      this.navigation.distanceM(position, etapes[this.etapeCourante].position),
    );
  }

  basculerPleinEcran(): void {
    this.pleinEcran = !this.pleinEcran;
    // Leaflet mesure son conteneur une fois : sans invalidateSize apres un
    // changement de taille, la carte reste dessinee aux anciennes dimensions.
    setTimeout(() => {
      this.carte?.invalidateSize();
      const p = this.pointLivreur();
      if (p) this.carte?.panTo(p);
    }, 60);
  }

  recalculer(): void {
    this.itineraire = null;
    this.calculerItineraire();
  }

  // ── Carte ──────────────────────────────────────────────────────────────────

  private preparerCarte(): void {
    if (!this.L || !this.carteHote || this.carte || !this.suivi) return;

    const centre = this.pointLivreur() ?? this.pointDestination();
    if (!centre) return;

    this.carte = this.L.map(this.carteHote.nativeElement, {
      zoomControl: true,
      attributionControl: true,
    }).setView(centre, 14);

    this.leaflet.fondDeCarte(this.L).addTo(this.carte);

    const arrivee = this.pointDestination();
    if (arrivee) {
      this.marqueurDestination = this.L.marker(arrivee, {
        icon: this.leaflet.pastille(this.L, '#D97E1F', 'pi-map-marker'),
      })
        .addTo(this.carte)
        .bindPopup('Point de livraison');
    }

    this.majPositionSurCarte();
    this.tracerRoute();
    // Leaflet mesure son conteneur à la création : s'il était encore masqué,
    // il retient une taille nulle et n'affiche qu'une zone grise.
    setTimeout(() => this.carte?.invalidateSize(), 0);
  }

  private majPositionSurCarte(): void {
    // Chaque relevé sert trois fois : à replacer le marqueur, à faire avancer la
    // consigne, et à vérifier qu'on est toujours sur la route.
    this.majEtapeCourante();
    this.verifierEcartItineraire();

    if (!this.carte || !this.L) return;
    const p = this.pointLivreur();
    if (!p) return;

    if (this.marqueurLivreur) {
      this.marqueurLivreur.setLatLng(p);
    } else {
      this.marqueurLivreur = this.L.marker(p, {
        icon: this.leaflet.pastilleOrientee(this.L, '#2D6A4F', 'pi-truck', this.etat.capDegres),
      }).addTo(this.carte);
    }
    this.carte.panTo(p);
  }

  private tracerRoute(): void {
    if (!this.carte || !this.L || !this.itineraire?.points.length) return;

    if (this.ligneRoute) this.carte.removeLayer(this.ligneRoute);
    this.ligneRoute = this.L.polyline(this.itineraire.points, {
      color: '#2D6A4F',
      weight: 5,
      opacity: 0.75,
    }).addTo(this.carte);

    this.carte.fitBounds(this.ligneRoute.getBounds().pad(0.15));
  }

  private pointDestination(): [number, number] | null {
    const s = this.suivi;
    return s?.destinationLatitude != null && s?.destinationLongitude != null
      ? [s.destinationLatitude, s.destinationLongitude]
      : null;
  }

  /** Position issue du GPS local — plus fraîche que celle renvoyée par le serveur. */
  private pointLivreur(): [number, number] | null {
    if (this.etat.latitude != null && this.etat.longitude != null) {
      return [this.etat.latitude, this.etat.longitude];
    }
    const s = this.suivi;
    return s?.livreurLatitude != null && s?.livreurLongitude != null
      ? [s.livreurLatitude, s.livreurLongitude]
      : null;
  }

  // ── Départ ─────────────────────────────────────────────────────────────────

  demarrer(): void {
    if (this.demarrageEnCours) return;
    this.demarrageEnCours = true;

    this.livraisonService.demarrerLivraison(this.remiseId).subscribe({
      next: (suivi) => {
        this.suivi = suivi;
        this.demarrageEnCours = false;
        this.tracker.demarrer(this.remiseId);
        this.toast.success("En route. L'acheteur peut maintenant vous suivre.");
        this.calculerItineraire();
      },
      error: (e) => {
        this.demarrageEnCours = false;
        this.toast.error(e?.error?.message ?? 'Le départ n’a pas pu être enregistré.');
      },
    });
  }

  // ── Remise ─────────────────────────────────────────────────────────────────

  ouvrirRemise(): void {
    this.remiseOuverte = true;
    this.codeSaisi = '';
    this.photoFichier = null;
    this.photoApercu = null;
  }

  fermerRemise(): void {
    this.remiseOuverte = false;
  }

  choisirPhoto(event: Event): void {
    const fichier = (event.target as HTMLInputElement).files?.[0];
    if (!fichier) return;
    this.photoFichier = fichier;
    const lecteur = new FileReader();
    lecteur.onload = () => (this.photoApercu = lecteur.result as string);
    lecteur.readAsDataURL(fichier);
  }

  get remisePrete(): boolean {
    return this.codeSaisi.trim().length === 4 && this.photoFichier !== null;
  }

  /** Envoie la photo puis valide le code : le serveur refuse une remise sans preuve. */
  validerRemise(): void {
    if (!this.suivi || !this.photoFichier || !this.remisePrete || this.remiseEnCours) return;
    this.remiseEnCours = true;

    const commandeId = this.suivi.commandeId;
    const articles = this.suivi.articleIds ?? [];

    this.livraisonService.uploadPhotoRemise(this.photoFichier).subscribe({
      next: ({ url }) => {
        this.livraisonService
          .validerRemise(commandeId, articles, this.codeSaisi.trim(), url)
          .subscribe({
            next: () => {
              this.remiseEnCours = false;
              this.remiseOuverte = false;
              // La course est finie : le partage s'arrête de lui-même.
              this.tracker.arreter();
              this.toast.success('Remise confirmée. La livraison est terminée.');
              this.charger();
            },
            error: (e) => {
              this.remiseEnCours = false;
              this.toast.error(e?.error?.message ?? "Le code n'a pas été accepté.");
            },
          });
      },
      error: () => {
        this.remiseEnCours = false;
        this.toast.error("L'envoi de la photo a échoué. Réessayez.");
      },
    });
  }

  // ── Affichage ──────────────────────────────────────────────────────────────

  private majCompteur(): void {
    this.secondesDepuisEnvoi = this.etat.dernierEnvoi
      ? Math.round((Date.now() - this.etat.dernierEnvoi.getTime()) / 1000)
      : null;
  }

  get lienRetour(): string {
    return this.suivi?.roleObservateur === 'TRANSPORTEUR'
      ? '/transporteur/mes-courses'
      : '/vendeur/mes-ventes';
  }

  get libelleRetour(): string {
    return this.suivi?.roleObservateur === 'TRANSPORTEUR' ? 'Mes courses' : 'Mes ventes';
  }

  /** Je regarde une course que quelqu'un d'autre conduit. */
  get enObservation(): boolean {
    return !!this.suivi && !this.suivi.estLeLivreur;
  }

  get transmissionSaine(): boolean {
    const s = this.secondesDepuisEnvoi;
    return this.etat.actif && s !== null && s < 90 && this.etat.enAttente === 0;
  }

  /** La prochaine consigne de navigation, celle qui reste à exécuter. */
  get prochaineEtape() {
    return this.itineraire?.etapes?.[this.etapeCourante] ?? null;
  }

  /**
   * Distance jusqu'à cette manœuvre, mesurée depuis la position actuelle.
   *
   * La valeur donnée par le calculateur est la longueur du tronçon complet :
   * l'afficher telle quelle annoncerait « dans 800 m » alors qu'il en reste
   * cinquante. Repli sur elle uniquement tant qu'aucune position n'est connue.
   */
  get distanceEtapeM(): number {
    return this.distanceProchaineM ?? this.prochaineEtape?.distanceM ?? 0;
  }

  /** Les consignes encore à venir — celles déjà franchies n'intéressent plus. */
  get etapesRestantes() {
    return this.itineraire?.etapes?.slice(this.etapeCourante) ?? [];
  }

  iconeManoeuvre(manoeuvre: string): string {
    if (manoeuvre.includes('left')) return 'pi-arrow-left';
    if (manoeuvre.includes('right')) return 'pi-arrow-right';
    if (manoeuvre === 'uturn') return 'pi-replay';
    if (manoeuvre === 'arrive') return 'pi-flag';
    return 'pi-arrow-up';
  }
}
