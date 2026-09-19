// livraison/suivi/suivi.component.ts
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivraisonService, PointTrace, SuiviLivraison } from '../../../shared/services/livraison.service';
import { LeafletLoaderService } from '../../../shared/services/leaflet-loader.service';
import { PositionLivreur, SuiviTempsReelService } from '../services/suivi-temps-reel.service';
import { Itineraire, ItineraireService } from '../services/itineraire.service';
import { NavigationService } from '../services/navigation.service';
import { Subscription } from 'rxjs';

/**
 * La carte que l'acheteur regarde pendant que son animal arrive.
 *
 * <p>Deux sources, dans cet ordre : un canal temps réel qui pousse chaque
 * position dès qu'elle arrive, et un sondage qui reste en arrière-plan. Le
 * sondage n'est pas un vestige — il rattrape ce que le canal ne peut pas donner
 * (changement d'état, adresse modifiée) et prend seul le relais quand la
 * connexion ne s'établit pas, ce qui arrive derrière certains réseaux mobiles.
 *
 * <p>Tant que le canal tient, le sondage se met au ralenti : le maintenir à
 * pleine cadence doublerait la charge pour redire ce qui vient d'arriver.
 */
@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  standalone: false,
  // Fourni au composant, pas à la racine : le canal se ferme avec l'écran.
  providers: [SuiviTempsReelService],
})
export class SuiviComponent implements OnInit, AfterViewInit, OnDestroy {
  private carteHote?: ElementRef<HTMLDivElement>;

  /**
   * Le conteneur vit sous un *ngIf : un setter le capte quand il parait.
   *
   * <p>Un @ViewChild simple ne suffit pas ici. À ngAfterViewInit le suivi n'est
   * pas encore charge, donc carteAffichable est faux, donc le div n'existe pas
   * et la reference reste vide. Quand les donnees arrivent, majCarte() est
   * appelee dans la foulee — mais Angular n'a pas encore rendu le div, et elle
   * repart aussitot. Plus rien ne la rappelait avant le sondage suivant : la
   * carte restait grise quinze secondes, et jusqu'a une minute depuis que le
   * canal temps reel met le sondage au ralenti.
   */
  @ViewChild('carte') set carteRef(element: ElementRef<HTMLDivElement> | undefined) {
    if (!element) {
      // Le conteneur a disparu : garder la carte reviendrait a la laisser
      // accrochee a un noeud detache du document, ou plus rien ne s'affiche et
      // dont les ecouteurs continuent de tourner. On la libere pour qu'une
      // reapparition reparte sur un conteneur mesurable.
      if (this.animation) cancelAnimationFrame(this.animation);
      this.animation = undefined;
      this.carte?.remove?.();
      this.carte = undefined;
      this.marqueurLivreur = undefined;
      this.marqueurDestination = undefined;
      this.ligneTrace = undefined;
      this.ligneRoute = undefined;
      this.carteHote = undefined;
      this.vueCadree = false;
      return;
    }
    this.carteHote = element;
    this.majCarte();
  }

  remiseId!: number;
  suivi: SuiviLivraison | null = null;
  chargement = true;
  erreur = false;
  carteIndisponible = false;

  /** Carte en plein ecran — une vignette ne montre pas un trajet. */
  pleinEcran = false;

  private L: any;
  private carte: any;
  private marqueurLivreur: any;
  private marqueurDestination: any;
  private ligneTrace: any;
  private trace: PointTrace[] = [];
  private minuterie?: ReturnType<typeof setInterval>;
  private vueCadree = false;
  private abonnements: Subscription[] = [];
  private animation?: number;
  private capAffiche: number | null = null;

  /**
   * Le parcours recalé sur les routes, quand le recalage a abouti.
   *
   * Les relevés GPS bruts dérivent : tracés tels quels, ils coupent les pâtés de
   * maisons et zigzaguent aux carrefours. L'acheteur y lit du bruit là où il y a
   * eu un trajet. Le recalage rattache chaque point à la voie la plus plausible.
   */
  private traceRecalee: [number, number][] | null = null;

  /** Jusqu'où le recalage porte : au-delà, les points bruts sont ajoutés tels quels. */
  private indexRecale = 0;

  /** Longueur du parcours au dernier recalage — sert à espacer les demandes. */
  private pointsAuDernierRecalage = 0;

  /** Un recalage coûte un appel externe : inutile de le refaire pour trois points. */
  private static readonly POINTS_AVANT_RECALAGE = 6;

  // ── Route restante ─────────────────────────────────────────────────────────
  //
  // L'écran ne montrait que le chemin parcouru, et annonçait une distance « à vol
  // d'oiseau ». C'est ce qu'on affiche faute de mieux : ni la vraie distance, ni
  // une heure d'arrivée. Or c'est exactement ce qu'on regarde en attendant une
  // livraison — par où il arrive, et dans combien de temps.
  //
  // La route n'est PAS recalculée à chaque position. Elle est calculée une fois,
  // puis simplement raccourcie : à chaque point reçu, on repart du sommet le plus
  // proche du véhicule. La ligne colle donc au camion sans coûter un appel, et le
  // serveur d'itinéraire — public et gratuit — n'est sollicité que lorsque le
  // trajet change réellement.

  /** L'itinéraire complet, tel que calculé la dernière fois. */
  private itineraire: Itineraire | null = null;
  private ligneRoute: any;

  /** Ce qu'il reste à parcourir, le long de la route. */
  distanceRestanteM: number | null = null;
  dureeRestanteS: number | null = null;
  arriveePrevue: Date | null = null;

  /** Vrai quand le calcul a échoué : l'écran retombe alors sur le vol d'oiseau. */
  itineraireIndisponible = false;

  private dernierCalculMs = 0;

  /**
   * Au-delà de cet écart à la route, le trajet affiché ne correspond plus.
   *
   * Plus permissif que le seuil du livreur (40 m) : ici on ne guide personne, on
   * illustre. Recalculer pour une déviation de cinquante mètres serait un appel
   * réseau pour un changement invisible à l'échelle de la carte.
   */
  private static readonly ECART_MAX_M = 150;

  /** Rafraîchissement de l'estimation, même en restant sur la route. */
  private static readonly INTERVALLE_CALCUL_MS = 180_000;

  /** Vrai tant que les positions arrivent par le canal — affiché à l'écran. */
  tempsReel = false;

  // ── Qui regarde ────────────────────────────────────────────────────────────
  //
  // Le meme ecran sert les trois parties. Il montre la meme carte a chacune —
  // c'est bien la meme livraison — mais pas le meme texte : dire « votre animal
  // arrive » au vendeur qui l'a vendu, ou lui rappeler de garder un code que
  // l'acheteur seul detient, serait faux.
  //
  // Le role vient du serveur, jamais du client : c'est lui qui sait a quel titre
  // cette personne a le droit de regarder.

  get estVendeur(): boolean {
    return this.suivi?.roleObservateur === 'VENDEUR';
  }

  get estAcheteur(): boolean {
    return this.suivi?.roleObservateur !== 'VENDEUR';
  }

  /** Ou renvoie le lien de retour, selon d'ou l'on vient. */
  get lienRetour(): string {
    return this.estVendeur ? '/vendeur/mes-ventes' : '/acheteur/mes-achats';
  }

  get libelleRetour(): string {
    return this.estVendeur ? 'Mes ventes' : 'Mes achats';
  }

  /** Cadence de secours, quand le canal n'est pas établi. */
  private static readonly SONDAGE_MS = 15_000;

  /**
   * Cadence de veille, quand le canal fonctionne.
   *
   * On ne coupe pas le sondage pour autant : il porte ce que le canal ne pousse
   * pas — passage à « remis », adresse corrigée, code consommé.
   */
  private static readonly SONDAGE_LENT_MS = 60_000;

  /**
   * Durée du glissement entre deux positions.
   *
   * Assez long pour lire un mouvement, assez court pour que le marqueur soit
   * arrivé avant le point suivant — qui tombe au plus tôt cinq secondes après.
   */
  private static readonly ANIMATION_MS = 900;

  /** En deçà, faire pivoter la flèche produirait un tremblement, pas une information. */
  private static readonly SEUIL_CAP_DEG = 12;

  constructor(
    private route: ActivatedRoute,
    private livraisonService: LivraisonService,
    private leaflet: LeafletLoaderService,
    private tempsReelService: SuiviTempsReelService,
    public itineraireService: ItineraireService,
    private navigation: NavigationService,
  ) {}

  ngOnInit(): void {
    this.remiseId = Number(this.route.snapshot.paramMap.get('remiseId'));
    this.charger(true);
    this.reglerSondage(SuiviComponent.SONDAGE_MS);

    this.abonnements.push(
      this.tempsReelService.positions$.subscribe((p) => this.surPositionPoussee(p)),
      this.tempsReelService.connecte$.subscribe((ouvert) => {
        this.tempsReel = ouvert;
        this.reglerSondage(ouvert ? SuiviComponent.SONDAGE_LENT_MS : SuiviComponent.SONDAGE_MS);
      }),
    );

    this.tempsReelService.connecter(this.remiseId);
  }

  ngAfterViewInit(): void {
    // Ne fait que charger la bibliotheque. Le dessin est declenche par le
    // setter ci-dessus, ou par l'arrivee des donnees — selon ce qui vient en
    // dernier, et l'ordre n'est pas garanti.
    this.preparerCarte();
  }

  ngOnDestroy(): void {
    if (this.minuterie) clearInterval(this.minuterie);
    if (this.animation) cancelAnimationFrame(this.animation);
    this.abonnements.forEach((a) => a.unsubscribe());
    this.tempsReelService.deconnecter();
    this.carte?.remove?.();
  }

  /** Remplace la minuterie de sondage — appelée quand le canal s'ouvre ou tombe. */
  private reglerSondage(intervalle: number): void {
    if (this.minuterie) clearInterval(this.minuterie);
    if (this.suivi?.etat === 'REMIS') return;
    this.minuterie = setInterval(() => this.charger(false), intervalle);
  }

  // ── Temps réel ─────────────────────────────────────────────────────────────

  /**
   * Une position vient d'arriver par le canal.
   *
   * On met à jour le modèle local sans repasser par le serveur : la donnée reçue
   * est exactement celle qu'un sondage renverrait, et un aller-retour de plus
   * n'apporterait qu'un délai.
   */
  private surPositionPoussee(point: PositionLivreur): void {
    if (!this.suivi || point.remiseId !== this.remiseId) return;

    this.suivi.livreurLatitude = point.latitude;
    this.suivi.livreurLongitude = point.longitude;
    this.suivi.livreurPositionAt = point.mesureeLe;
    // Un point qui vient d'arriver est fraîche par construction : le serveur ne
    // pousse que ce qu'il vient d'accepter.
    this.suivi.positionDisponible = true;
    this.majAnciennete();

    this.majCapMarqueur(point.capDegres ?? null);
    this.animerVers([point.latitude, point.longitude]);
    this.prolongerTrace(point);
    this.majItineraire();
  }

  /**
   * Fait glisser le marqueur au lieu de le téléporter.
   *
   * Sans cela, chaque position reçue déplace le marqueur d'un bloc — le lecteur
   * voit un saut et doit reconstruire lui-même le trajet. L'interpolation ne
   * ment pas plus que le saut : elle montre le déplacement qui a bien eu lieu,
   * simplement étalé dans le temps.
   */
  private animerVers(arrivee: [number, number]): void {
    // Pas encore de marqueur : rien à faire glisser, on le crée à sa place.
    if (!this.carte || !this.marqueurLivreur) {
      this.majCarte();
      return;
    }
    if (this.animation) cancelAnimationFrame(this.animation);

    const debut = performance.now();
    const actuelle = this.marqueurLivreur.getLatLng();
    const latA = actuelle.lat;
    const lonA = actuelle.lng;
    const [latB, lonB] = arrivee;

    const pas = (maintenant: number) => {
      const avancement = Math.min(1, (maintenant - debut) / SuiviComponent.ANIMATION_MS);
      // Amorti en fin de course : un arrêt net rend le mouvement mécanique.
      const t = 1 - Math.pow(1 - avancement, 3);
      this.marqueurLivreur.setLatLng([latA + (latB - latA) * t, lonA + (lonB - lonA) * t]);
      if (avancement < 1) {
        this.animation = requestAnimationFrame(pas);
      } else {
        this.animation = undefined;
      }
    };
    this.animation = requestAnimationFrame(pas);
  }

  /** Ne refait l'icône que si la direction a réellement changé — elle coûte un rendu DOM. */
  private majCapMarqueur(cap: number | null): void {
    if (!this.marqueurLivreur || !this.L) return;
    if (cap == null && this.capAffiche == null) return;
    if (cap != null && this.capAffiche != null
        && Math.abs(cap - this.capAffiche) < SuiviComponent.SEUIL_CAP_DEG) {
      return;
    }
    this.capAffiche = cap;
    this.marqueurLivreur.setIcon(
      this.leaflet.pastilleOrientee(this.L, '#2D6A4F', 'pi-truck', cap),
    );
  }

  /**
   * Ajoute le point au tracé affiché, sans attendre le prochain appel au serveur.
   *
   * Le serveur applique son propre pas minimal : le tracé qu'il renverra au
   * sondage suivant sera plus clairsemé que celui-ci, et le remplacera. Entre
   * deux, mieux vaut une ligne trop détaillée qu'une ligne qui s'arrête net.
   */
  private prolongerTrace(point: PositionLivreur): void {
    this.trace = [
      ...this.trace,
      { latitude: point.latitude, longitude: point.longitude, le: point.mesureeLe },
    ];
    this.tracerParcours();
  }

  basculerPleinEcran(): void {
    this.pleinEcran = !this.pleinEcran;
    setTimeout(() => this.carte?.invalidateSize(), 60);
  }

  // ── Données ────────────────────────────────────────────────────────────────

  private charger(premierAppel: boolean): void {
    this.livraisonService.suivre(this.remiseId).subscribe({
      next: (suivi) => {
        this.suivi = suivi;
        this.chargement = false;
        this.majAnciennete();
        this.majCarte();
        this.majItineraire();
        this.chargerTrace();
        // Une livraison terminée n'a plus rien à raconter : on cesse de sonder.
        if (suivi.etat === 'REMIS' && this.minuterie) {
          clearInterval(this.minuterie);
          this.minuterie = undefined;
        }
      },
      error: () => {
        // Une erreur passagère pendant le sondage ne doit pas effacer la carte
        // déjà affichée : seul le premier chargement bascule en état d'erreur.
        if (premierAppel) {
          this.erreur = true;
          this.chargement = false;
        }
      },
    });
  }

  /**
   * Charge le parcours parcouru.
   *
   * Appelé à chaque sondage : le tracé ne grandit que de quelques points, et une
   * requête séparée évite de gonfler la réponse de suivi.
   */
  private chargerTrace(): void {
    this.livraisonService.trace(this.remiseId).subscribe({
      next: (points) => {
        this.trace = points;
        this.tracerParcours();
        this.recalerTrace();
      },
      error: () => {
        // Sans conséquence : la carte reste lisible avec les seuls marqueurs.
      },
    });
  }

  /** Dessine le chemin déjà parcouru, du départ jusqu'au dernier point connu. */
  private tracerParcours(): void {
    if (!this.carte || !this.L || this.trace.length < 2) return;

    const points = this.pointsAffiches();
    if (this.ligneTrace) {
      this.ligneTrace.setLatLngs(points);
      return;
    }
    this.ligneTrace = this.L.polyline(points, {
      color: '#2D6A4F',
      weight: 4,
      opacity: 0.6,
      // Pointillés : c'est le chemin déjà fait, pas la route à venir.
      dashArray: '6, 8',
    }).addTo(this.carte);
  }

  /**
   * Le parcours tel qu'il s'affiche : la partie recalée, prolongée des points
   * bruts arrivés depuis.
   *
   * Le recalage porte sur un instantané du parcours. Les positions reçues après
   * coup ne peuvent pas attendre le recalage suivant, sinon la ligne s'arrêterait
   * visiblement derrière le marqueur.
   */
  private pointsAffiches(): [number, number][] {
    const bruts = this.trace.map((p) => [p.latitude, p.longitude] as [number, number]);
    if (!this.traceRecalee) return bruts;
    return [...this.traceRecalee, ...bruts.slice(this.indexRecale)];
  }

  /**
   * Demande le recalage du parcours sur le réseau routier.
   *
   * Purement cosmétique, et traité comme tel : l'échec ne se voit pas, la ligne
   * brute reste affichée. Le service de recalage est public et gratuit, on ne
   * lui demande donc rien qu'on ne puisse se passer d'obtenir.
   */
  private recalerTrace(): void {
    if (this.trace.length < 4) return;
    if (this.trace.length - this.pointsAuDernierRecalage
        < SuiviComponent.POINTS_AVANT_RECALAGE) {
      return;
    }

    const instantane = this.trace.length;
    const bruts = this.trace.map((p) => [p.latitude, p.longitude] as [number, number]);

    this.itineraireService.recaler(bruts).subscribe({
      next: (recale) => {
        this.traceRecalee = recale;
        this.indexRecale = instantane;
        this.pointsAuDernierRecalage = instantane;
        this.tracerParcours();
      },
      error: () => {
        // On ne réessaie pas dans la foulée : le prochain lot de points
        // relancera naturellement la demande.
        this.pointsAuDernierRecalage = instantane;
      },
    });
  }

  // ── Route restante ─────────────────────────────────────────────────────────

  /**
   * Tient à jour la route affichée devant le véhicule.
   *
   * Deux régimes, et c'est la distinction qui rend l'écran fluide sans coûter :
   * le plus souvent on se contente de raccourcir la route déjà connue, et on ne
   * redemande un calcul que si le véhicule l'a quittée ou si l'estimation date.
   */
  private majItineraire(): void {
    const depart = this.pointLivreur();
    const arrivee = this.pointDestination();

    // Rien à guider : retrait sur place, livraison terminée, ou position perdue.
    if (!depart || !arrivee || this.suivi?.etat === 'REMIS') {
      this.effacerRoute();
      return;
    }

    if (this.doitRecalculer(depart)) {
      this.calculerItineraire(depart, arrivee);
      return;
    }
    this.rafraichirRouteRestante(depart);
  }

  private doitRecalculer(depart: [number, number]): boolean {
    if (!this.itineraire?.points.length) return true;

    // L'estimation vieillit : les conditions de circulation changent, et une
    // heure d'arrivée calculée il y a une demi-heure ne vaut plus rien.
    if (Date.now() - this.dernierCalculMs > SuiviComponent.INTERVALLE_CALCUL_MS) return true;

    // Le véhicule a quitté la route : la ligne affichée décrirait un trajet
    // qu'il ne fait pas.
    return this.navigation.distanceAuTraceM(depart, this.itineraire.points)
      > SuiviComponent.ECART_MAX_M;
  }

  private calculerItineraire(depart: [number, number], arrivee: [number, number]): void {
    this.dernierCalculMs = Date.now();

    this.itineraireService.calculer(depart, arrivee).subscribe({
      next: (it) => {
        // Une réponse doublée par une plus récente est jetée : la garder
        // afficherait une route déjà périmée.
        if (this.itineraire && it.version < this.itineraire.version) return;
        this.itineraire = it;
        this.itineraireIndisponible = false;
        this.rafraichirRouteRestante(this.pointLivreur() ?? depart);
      },
      error: () => {
        // Sans conséquence : la carte reste lisible, et l'écran retombe sur la
        // distance à vol d'oiseau. Le calcul d'itinéraire est un service
        // extérieur qu'on ne maîtrise pas, il ne doit rien bloquer.
        this.itineraireIndisponible = true;
      },
    });
  }

  /**
   * Raccourcit la route affichée pour qu'elle reparte du véhicule.
   *
   * C'est ce qui donne la sensation de progression sans appel réseau : la route
   * ne bouge pas, c'est la portion montrée qui se réduit. L'estimation de durée
   * suit la même proportion — approximation assumée, mais qui vaut mieux qu'une
   * heure d'arrivée figée au moment du calcul.
   */
  private rafraichirRouteRestante(depart: [number, number]): void {
    const points = this.itineraire?.points;
    if (!points?.length || !this.itineraire) return;

    // indexDevant, et non le sommet le plus proche : entre deux sommets
    // eloignes, le plus proche peut etre derriere le vehicule. La distance
    // restante augmenterait alors qu'on avance, et l'heure d'arrivee reculerait.
    const index = this.navigation.indexDevant(depart, points);
    // Le vehicule d'abord : sans lui la ligne commencerait au sommet suivant,
    // et un decrochage se verrait a chaque virage.
    const restants: [number, number][] = [depart, ...points.slice(index)];

    const distance = this.navigation.longueurM(restants);
    const total = this.navigation.longueurM(points);
    this.distanceRestanteM = Math.round(distance);
    this.dureeRestanteS = total > 0
      ? Math.round(this.itineraire.dureeS * (distance / total))
      : null;
    this.arriveePrevue = this.dureeRestanteS != null
      ? new Date(Date.now() + this.dureeRestanteS * 1000)
      : null;

    this.tracerRoute(restants);
  }

  private tracerRoute(points: [number, number][]): void {
    if (!this.carte || !this.L) return;
    if (this.ligneRoute) {
      this.ligneRoute.setLatLngs(points);
      return;
    }
    // Trait plein, et pose sous les marqueurs : c'est la route a venir, par
    // opposition au pointille du chemin deja parcouru.
    this.ligneRoute = this.L.polyline(points, {
      color: '#1B4332',
      weight: 5,
      opacity: 0.85,
    }).addTo(this.carte);
    this.ligneRoute.bringToBack?.();
  }

  private effacerRoute(): void {
    if (this.ligneRoute && this.carte) this.carte.removeLayer(this.ligneRoute);
    this.ligneRoute = undefined;
    this.itineraire = null;
    this.distanceRestanteM = null;
    this.dureeRestanteS = null;
    this.arriveePrevue = null;
  }

  /** « 1,2 km » / « 350 m » et « 25 min », empruntes au meme formateur que le livreur. */
  get distanceLisible(): string {
    return this.distanceRestanteM == null
      ? ''
      : this.itineraireService.formaterDistance(this.distanceRestanteM);
  }

  get dureeLisible(): string {
    return this.dureeRestanteS == null
      ? ''
      : this.itineraireService.formaterDuree(this.dureeRestanteS);
  }

  // ── Carte ──────────────────────────────────────────────────────────────────

  private preparerCarte(): void {
    this.leaflet
      .charger()
      .then((L) => {
        this.L = L;
        this.majCarte();
      })
      .catch(() => (this.carteIndisponible = true));
  }

  private majCarte(): void {
    if (!this.L || !this.suivi || !this.carteHote) return;

    const destination = this.pointDestination();
    const livreur = this.pointLivreur();
    if (!destination && !livreur) return;

    if (!this.carte) {
      this.carte = this.L.map(this.carteHote.nativeElement, {
        zoomControl: false,
        attributionControl: true,
      }).setView(livreur ?? destination, 13);
      this.leaflet.fondDeCarte(this.L).addTo(this.carte);
      // Zoom a gauche : le bouton plein ecran occupe deja le coin haut droit, et
      // trois commandes empilees au meme endroit se manquent au pouce.
      this.L.control.zoom({ position: 'topleft' }).addTo(this.carte);
      this.tracerParcours();

      // Leaflet mesure son conteneur une seule fois, a la creation. Si le div
      // vient d'apparaitre, sa hauteur peut encore etre nulle : la carte reste
      // alors une zone grise, quelles que soient les couches ajoutees ensuite.
      setTimeout(() => this.carte?.invalidateSize(), 0);
    }

    if (destination) {
      const icone = this.leaflet.pastille(this.L, '#D97E1F', 'pi-map-marker');
      if (this.marqueurDestination) {
        this.marqueurDestination.setLatLng(destination);
      } else {
        this.marqueurDestination = this.L.marker(destination, { icon: icone })
          .addTo(this.carte)
          .bindPopup('Lieu de livraison');
      }
    }

    if (livreur) {
      if (this.marqueurLivreur) {
        // Même traitement que pour une position poussée : le sondage aussi
        // mérite un glissement plutôt qu'un saut.
        this.animerVers(livreur);
      } else {
        const icone = this.leaflet.pastilleOrientee(
          this.L, '#2D6A4F', 'pi-truck', this.capAffiche,
        );
        this.marqueurLivreur = this.L.marker(livreur, { icon: icone })
          .addTo(this.carte)
          .bindPopup(this.estVendeur ? "L'animal est ici" : 'Votre animal est ici');
      }
    } else if (this.marqueurLivreur) {
      // Position périmée : on retire le marqueur plutôt que de le laisser mentir.
      if (this.animation) cancelAnimationFrame(this.animation);
      this.animation = undefined;
      this.carte.removeLayer(this.marqueurLivreur);
      this.marqueurLivreur = undefined;
    }

    // Cadrer une seule fois : recadrer à chaque rafraîchissement annulerait le
    // zoom que l'acheteur vient d'ajuster à la main.
    if (!this.vueCadree && destination && livreur) {
      this.carte.fitBounds(this.L.latLngBounds([destination, livreur]).pad(0.25));
      this.vueCadree = true;
    }
  }

  private pointDestination(): [number, number] | null {
    const s = this.suivi;
    return s?.destinationLatitude != null && s?.destinationLongitude != null
      ? [s.destinationLatitude, s.destinationLongitude]
      : null;
  }

  private pointLivreur(): [number, number] | null {
    const s = this.suivi;
    return s?.positionDisponible && s.livreurLatitude != null && s.livreurLongitude != null
      ? [s.livreurLatitude, s.livreurLongitude]
      : null;
  }

  // ── Affichage ──────────────────────────────────────────────────────────────

  get carteAffichable(): boolean {
    return !this.carteIndisponible && (!!this.pointDestination() || !!this.pointLivreur());
  }

  get badgeClass(): string {
    switch (this.suivi?.etat) {
      case 'EN_ROUTE':
        return 'bg-[#E0EEE4] text-[#1B4332]';
      case 'A_RETIRER':
        return 'bg-[#E0EEE4] text-[#1B4332]';
      case 'REMIS':
        return 'bg-[#E0EEE4] text-[#2D6A4F]';
      case 'LITIGE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-[#FDF6EC] text-[#B96416]';
    }
  }

  /**
   * Depuis combien de minutes la position affichée date-t-elle ?
   *
   * Champ recalculé à chaque sondage, et non getter : un getter appelant
   * Date.now() renvoie une valeur différente à chaque appel, ce qu'Angular
   * signale par NG0100 lors de sa seconde passe de vérification.
   */
  minutesDepuisPosition: number | null = null;

  private majAnciennete(): void {
    if (!this.suivi?.livreurPositionAt) {
      this.minutesDepuisPosition = null;
      return;
    }
    const ecart = Date.now() - new Date(this.suivi.livreurPositionAt).getTime();
    this.minutesDepuisPosition = Math.max(0, Math.round(ecart / 60_000));
  }
}
