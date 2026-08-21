import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PanierService } from './services/panier.service';
import { Panier, PanierItem, PanierParVendeur } from './models/panier.model';
import { PaiementService } from '../paiement/services/paiement.service';
import { AssetUrlPipe } from '../../shared/pipes/asset-url.pipe';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule, AssetUrlPipe],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit, OnDestroy {

  panier: Panier | null = null;
  groupesParVendeur: PanierParVendeur[] = [];
  chargement = true;
  commandeEnCours = false;

  private destroy$ = new Subject<void>();

  constructor(
    private panierService: PanierService,
    private paiementService: PaiementService
  ) {}

  ngOnInit(): void {
    this.panierService.panier$
      .pipe(takeUntil(this.destroy$))
      .subscribe(panier => {
        this.panier = panier;
        this.groupesParVendeur = panier
          ? this.panierService.getItemsParVendeur(panier)
          : [];
      });

    this.panierService.chargerPanier()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => (this.chargement = false),
        error: () => (this.chargement = false)
      });
  }

  modifierQuantite(item: PanierItem, nouvelleQuantite: number): void {
    if (nouvelleQuantite < 1) return;
    this.panierService.modifierQuantite(item.id, nouvelleQuantite)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  supprimerItem(item: PanierItem): void {
    if (!confirm(`Retirer "${item.animalNom}" du panier ?`)) return;
    this.panierService.supprimerArticle(item.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  confirmerVider(): void {
    if (!confirm('Vider tout le panier ?')) return;
    this.panierService.viderPanier()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  passerCommande(): void {
    this.commandeEnCours = true;
    this.paiementService.creerCommande()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: commande => (window.location.href = commande.checkoutUrl),
        error: () => (this.commandeEnCours = false)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}