// livraison/destination/destination.component.ts
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LivraisonService,
  ModeRemise,
  SuiviLivraison,
} from '../../../shared/services/livraison.service';
import { LeafletLoaderService } from '../../../shared/services/leaflet-loader.service';
import { ToastService } from '../../../core/services/toast.service';

/**
 * Où l'acheteur dit comment il veut récupérer son animal.
 *
 * Le point sur la carte compte autant que l'adresse écrite : l'adressage postal
 * étant rare, c'est souvent la seule donnée exploitable pour guider le livreur.
 */
@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  standalone: false,
})
export class DestinationComponent implements OnInit, AfterViewInit {
  private carteHote?: ElementRef<HTMLDivElement>;

  /**
   * Le conteneur de carte vit sous un *ngIf : il n'existe pas au moment de
   * ngAfterViewInit, mais seulement quand les donnees sont revenues et que le
   * mode TRANSPORT est actif.
   *
   * Un setter se declenche exactement a l'instant ou l'element entre dans le
   * DOM, quel que soit l'ordre entre la reponse HTTP et le cycle de rendu.
   * C'est ce decalage qui empechait la carte de s'afficher au retour sur la page.
   */
  @ViewChild('carte') set carteRef(element: ElementRef<HTMLDivElement> | undefined) {
    if (!element) return;
    this.carteHote = element;
    this.preparerCarte();
  }

  remiseId!: number;
  suivi: SuiviLivraison | null = null;
  chargement = true;
  erreur = false;
  enregistrement = false;
  carteIndisponible = false;
  localisationEnCours = false;

  mode: ModeRemise = 'RETRAIT_SUR_PLACE';
  adresseLigne = '';
  ville = '';
  indications = '';
  destinataireNom = '';
  destinataireTelephone = '';
  latitude?: number;
  longitude?: number;

  /** Abidjan — centre par défaut tant que rien n'est choisi. */
  private static readonly CENTRE_DEFAUT: [number, number] = [5.3599, -4.0083];

  private L: any;
  private carte: any;
  private marqueur: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livraisonService: LivraisonService,
    private leaflet: LeafletLoaderService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.remiseId = Number(this.route.snapshot.paramMap.get('remiseId'));
    this.livraisonService.suivre(this.remiseId).subscribe({
      next: (suivi) => {
        this.suivi = suivi;
        this.prefiller(suivi);
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  ngAfterViewInit(): void {
    this.leaflet
      .charger()
      .then((L) => {
        this.L = L;
        // Leaflet peut arriver apres l'element : on retente ici aussi.
        this.preparerCarte();
      })
      .catch(() => (this.carteIndisponible = true));
  }

  private prefiller(suivi: SuiviLivraison): void {
    this.mode = suivi.modeRemise;
    this.adresseLigne = suivi.adresseLigne ?? '';
    this.ville = suivi.adresseVille ?? '';
    this.indications = suivi.adresseIndications ?? '';
    this.destinataireNom = suivi.destinataireNom ?? '';
    this.destinataireTelephone = suivi.destinataireTelephone ?? '';
    this.latitude = suivi.destinationLatitude;
    this.longitude = suivi.destinationLongitude;
    // La carte se prepare via le setter de ViewChild, quand le *ngIf l'affiche.
  }

  // ── Carte ──────────────────────────────────────────────────────────────────

  private preparerCarte(): void {
    if (!this.L || !this.carteHote || this.carte) return;

    const centre: [number, number] =
      this.latitude != null && this.longitude != null
        ? [this.latitude, this.longitude]
        : DestinationComponent.CENTRE_DEFAUT;

    this.carte = this.L.map(this.carteHote.nativeElement, {
      zoomControl: true,
      attributionControl: true,
    }).setView(centre, this.latitude != null ? 15 : 11);

    this.leaflet.fondDeCarte(this.L).addTo(this.carte);

    // Poser le point d'un simple appui : plus rapide que de faire glisser un
    // marqueur sur un petit écran.
    this.carte.on('click', (evt: any) => {
      this.placerMarqueur(evt.latlng.lat, evt.latlng.lng);
    });

    if (this.latitude != null && this.longitude != null) {
      this.placerMarqueur(this.latitude, this.longitude);
    }

    // Leaflet mesure son conteneur a la creation. S'il etait encore masque ou
    // en cours de disposition, il retient une taille nulle et n'affiche qu'une
    // zone grise : on le force a se remesurer une fois le rendu termine.
    setTimeout(() => this.carte?.invalidateSize(), 0);
  }

  private placerMarqueur(lat: number, lng: number): void {
    this.latitude = Number(lat.toFixed(6));
    this.longitude = Number(lng.toFixed(6));

    const icone = this.leaflet.pastille(this.L, '#D97E1F', 'pi-map-marker');
    if (this.marqueur) {
      this.marqueur.setLatLng([lat, lng]);
    } else {
      this.marqueur = this.L.marker([lat, lng], { icon: icone, draggable: true }).addTo(this.carte);
      this.marqueur.on('dragend', () => {
        const p = this.marqueur.getLatLng();
        this.latitude = Number(p.lat.toFixed(6));
        this.longitude = Number(p.lng.toFixed(6));
      });
    }
  }

  utiliserMaPosition(): void {
    if (!navigator.geolocation) {
      this.toast.error("Ce navigateur ne permet pas la géolocalisation.");
      return;
    }
    this.localisationEnCours = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.localisationEnCours = false;
        this.placerMarqueur(pos.coords.latitude, pos.coords.longitude);
        this.carte?.setView([pos.coords.latitude, pos.coords.longitude], 16);
      },
      () => {
        this.localisationEnCours = false;
        this.toast.error('Position introuvable. Placez le point à la main sur la carte.');
      },
      { enableHighAccuracy: true, timeout: 15_000 },
    );
  }

  // ── Enregistrement ─────────────────────────────────────────────────────────

  choisirMode(mode: ModeRemise): void {
    this.mode = mode;
    if (mode === 'TRANSPORT') {
      // La carte n'existe que dans ce mode : elle est créée au moment où elle
      // devient visible, sinon Leaflet mesure un conteneur de hauteur nulle.
      setTimeout(() => {
        this.preparerCarte();
        this.carte?.invalidateSize();
      });
    }
  }

  get valide(): boolean {
    if (this.mode === 'RETRAIT_SUR_PLACE') return true;
    return this.adresseLigne.trim().length > 2;
  }

  enregistrer(): void {
    if (!this.valide || this.enregistrement) return;
    this.enregistrement = true;

    this.livraisonService
      .definirDestination(this.remiseId, {
        mode: this.mode,
        adresseLigne: this.adresseLigne.trim() || undefined,
        ville: this.ville.trim() || undefined,
        indications: this.indications.trim() || undefined,
        destinataireNom: this.destinataireNom.trim() || undefined,
        destinataireTelephone: this.destinataireTelephone.trim() || undefined,
        latitude: this.latitude,
        longitude: this.longitude,
      })
      .subscribe({
        next: () => {
          this.enregistrement = false;
          this.toast.success(
            this.mode === 'TRANSPORT'
              ? 'Adresse de livraison enregistrée. Le vendeur en est informé.'
              : 'Retrait sur place enregistré.',
          );
          this.router.navigate(['/acheteur/mes-achats']);
        },
        error: (e) => {
          this.enregistrement = false;
          this.toast.error(e?.error?.message ?? "L'enregistrement a échoué.");
        },
      });
  }
}
