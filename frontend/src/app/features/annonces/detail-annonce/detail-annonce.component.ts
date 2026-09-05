import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Listing } from '../models/listing.model';
import { ListingService } from '../services/listing.service';
import { PanierService } from '../../../features/panier/services/panier.service';
import { Role } from '../../../core/models/role.enum';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-detail-annonce',
  templateUrl: './detail-annonce.component.html',
  styleUrls: ['./detail-annonce.component.css'],
  standalone: false,
  providers: [PanierService]  // ← fournir localement pour forcer l'inclusion dans le graph
})
export class DetailAnnonceComponent implements OnInit, OnDestroy {
  listing?: Listing;
  loading = true;
  readonly fallbackDescription = "Aucune description n'a été fournie pour ce dossier animal.";

  ajoutEnCours = false;
  dejaAuPanier = false;
  panierSuccesMessage = '';

  activeImage = '';
  similarListings: Listing[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService,
    private panierService: PanierService,
    public auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    // Recharger la fiche à chaque changement d'id (navigation entre annonces similaires)
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const id = params.get('id');
        if (!id) {
          this.loading = false;
          return;
        }
        this.loading = true;
        this.listingService.get(id).subscribe({
          next: (listing) => {
            this.listing = listing;
            this.activeImage = listing.image || listing.gallery?.[0] || '';
            this.loading = false;
            this.loadSimilar(listing);
            if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
          },
          error: () => { this.loading = false; },
        });
      });
  }

  private loadSimilar(current: Listing): void {
    this.listingService.search({})
      .pipe(takeUntil(this.destroy$))
      .subscribe((listings) => {
        const sameType = listings.filter(
          (l) => l.id !== current.id && l.animalType === current.animalType
        );
        const others = listings.filter(
          (l) => l.id !== current.id && l.animalType !== current.animalType
        );
        this.similarListings = [...sameType, ...others].slice(0, 4);
      });
  }

  get galleryImages(): string[] {
    if (!this.listing) return [];
    const images = this.listing.gallery?.length
      ? this.listing.gallery
      : (this.listing.image ? [this.listing.image] : []);
    return images;
  }

  setActiveImage(image: string): void {
    this.activeImage = image;
  }

  get whatsappLink(): string | null {
    const phone = this.listing?.sellerPhone?.replace(/[^0-9+]/g, '');
    if (!phone) return null;
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé(e) par votre annonce « ${this.listing?.title} » sur BétailMarket.`
    );
    return `https://wa.me/${phone.replace('+', '')}?text=${message}`;
  }

  get phoneLink(): string | null {
    const phone = this.listing?.sellerPhone?.replace(/[^0-9+]/g, '');
    return phone ? `tel:${phone}` : null;
  }

  get reportLink(): string {
    const subject = encodeURIComponent(`Signalement d'annonce — ${this.listing?.title ?? ''} (${this.listing?.id ?? ''})`);
    return `mailto:support@betailmarket.ci?subject=${subject}`;
  }

  get canEdit(): boolean {
    return !!this.listing && this.auth.currentUser?.id === this.listing.sellerId;
  }

  get isAcheteur(): boolean {
    return this.auth.hasRole(Role.ACHETEUR);
  }

  togglingStatut = false;

  toggleStatut(): void {
    if (!this.listing || this.togglingStatut) return;
    const newStatus = this.listing.status === 'DISPONIBLE' ? 'INDISPONIBLE' : 'DISPONIBLE';
    this.togglingStatut = true;
    this.listingService.toggleStatus(this.listing.id, newStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated) => {
          this.listing = updated;
          this.togglingStatut = false;
          const msg = newStatus === 'INDISPONIBLE'
            ? 'Annonce désactivée avec succès.'
            : 'Annonce réactivée avec succès.';
          this.toast.success(msg);
        },
        error: () => {
          this.togglingStatut = false;
          this.toast.error('Une erreur est survenue, veuillez réessayer.');
        },
      });
  }

  trackByListing(_: number, listing: Listing): string {
    return listing.id;
  }

  ajouterAuPanier(): void {
    if (!this.listing) return;
    this.ajoutEnCours = true;
    // listing.id est un string (UUID) — correspond à PanierService.ajouterArticle(animalId: string)
    this.panierService.ajouterArticle(this.listing.id, 1)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.ajoutEnCours = false;
          this.dejaAuPanier = true;
          this.panierSuccesMessage = `${this.listing!.title} ajouté au panier !`;
          setTimeout(() => (this.panierSuccesMessage = ''), 4000);
        },
        error: () => { this.ajoutEnCours = false; },
      });
  }

  allerAuPanier(): void {
    this.router.navigate(['/panier']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}