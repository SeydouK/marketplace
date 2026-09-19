import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subject, timer, takeUntil, switchMap, takeWhile } from 'rxjs';

import { PaiementService } from './services/paiement.service';
import { Commande } from './models/commande.model';

type Affichage = 'verification' | 'succes' | 'echec' | 'introuvable';

const STATUTS_FINAUX_ECHEC = ['ECHOUEE', 'ANNULEE', 'EXPIREE'];
const POLL_INTERVAL_MS = 2000;
const POLL_MAX_TENTATIVES = 5;

@Component({
  selector: 'app-paiement-retour',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paiement-retour.component.html',
})
export class PaiementRetourComponent implements OnInit, OnDestroy {

  affichage: Affichage = 'verification';
  commande: Commande | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paiementService: PaiementService
  ) {}

  ngOnInit(): void {
    const commandeId = Number(this.route.snapshot.queryParamMap.get('commandeId'));

    if (!commandeId) {
      this.affichage = 'introuvable';
      return;
    }

    let tentative = 0;
    timer(0, POLL_INTERVAL_MS)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.paiementService.getCommande(commandeId)),
        takeWhile(c => {
          tentative++;
          return c.statut === 'EN_ATTENTE' && tentative < POLL_MAX_TENTATIVES;
        }, true)
      )
      .subscribe({
        next: c => this.majAffichage(c),
        error: () => (this.affichage = 'introuvable'),
      });
  }

  private majAffichage(c: Commande): void {
    this.commande = c;
    if (c.statut === 'PAYEE') this.affichage = 'succes';
    else if (STATUTS_FINAUX_ECHEC.includes(c.statut)) this.affichage = 'echec';
    else this.affichage = 'verification';
  }

  retourAuPanier(): void { this.router.navigate(['/panier']); }
  retourAccueil(): void { this.router.navigate(['/home']); }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
