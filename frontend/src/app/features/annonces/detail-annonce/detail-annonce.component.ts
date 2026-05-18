import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Listing } from '../models/listing.model';
import { ListingService } from '../services/listing.service';
import { PanierService } from '../../../features/panier/services/panier.service';

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

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService,
    private panierService: PanierService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingService.get(id).subscribe({
        next: (listing) => {
          this.listing = listing;
          this.loading = false;
        },
        error: () => { this.loading = false; },
      });
      return;
    }
    this.loading = false;
  }

  get canEdit(): boolean {
    return !!this.listing && this.auth.currentUser?.id === this.listing.sellerId;
  }

  get isAcheteur(): boolean {
    const role = this.auth.currentUser?.role;
    return role === 'USER' || role === 'ACHETEUR';
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