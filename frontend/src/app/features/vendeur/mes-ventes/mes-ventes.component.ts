// vendeur/mes-ventes/mes-ventes.component.ts
import { Component, OnInit } from '@angular/core';
import {
  LivraisonService,
  MaVente,
  EtatVente,
} from '../../../shared/services/livraison.service';
import { ToastService } from '../../../core/services/toast.service';

type Onglet = 'ALL' | 'A_REMETTRE' | 'EN_ATTENTE' | 'REGLE' | 'LITIGE';

@Component({
  selector: 'app-mes-ventes',
  templateUrl: './mes-ventes.component.html',
  standalone: false,
})
export class MesVentesComponent implements OnInit {
  ventes: MaVente[] = [];
  chargement = true;
  erreur = false;

  activeTab: Onglet = 'ALL';
  tabs: { label: string; value: Onglet }[] = [
    { label: 'Toutes', value: 'ALL' },
    { label: 'À remettre', value: 'A_REMETTRE' },
    { label: 'En attente de règlement', value: 'EN_ATTENTE' },
    { label: 'Réglées', value: 'REGLE' },
    { label: 'Litiges', value: 'LITIGE' },
  ];

  enCours = new Set<number>();

  constructor(
    private livraisonService: LivraisonService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  private charger(): void {
    this.chargement = true;
    this.erreur = false;
    this.livraisonService.getMesVentes().subscribe({
      next: (ventes) => {
        this.ventes = ventes;
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  // ── Filtres ────────────────────────────────────────────────────────────────

  setTab(tab: Onglet): void {
    this.activeTab = tab;
  }

  private filtrer(tab: Onglet): MaVente[] {
    switch (tab) {
      case 'ALL':
        return this.ventes;
      case 'A_REMETTRE':
        return this.ventes.filter((v) => v.statutLivraison === 'A_REMETTRE');
      case 'EN_ATTENTE':
        return this.ventes.filter(
          (v) => v.etatGlobal === 'EN_LIVRAISON' || v.etatGlobal === 'EN_ATTENTE_CONFIRMATION',
        );
      case 'REGLE':
        return this.ventes.filter((v) => v.etatGlobal === 'VERSE');
      case 'LITIGE':
        return this.ventes.filter((v) => v.etatGlobal === 'LITIGE');
    }
  }

  get ventesFiltrees(): MaVente[] {
    return this.filtrer(this.activeTab);
  }

  compteOnglet(tab: Onglet): number {
    return this.filtrer(tab).length;
  }

  // ── Totaux ─────────────────────────────────────────────────────────────────

  /** Argent encaissé par la plateforme mais pas encore dû au vendeur. */
  get totalSousSequestre(): number {
    return this.ventes
      .filter((v) => v.statutVersement === 'BLOQUE')
      .reduce((somme, v) => somme + (v.montantNet ?? 0), 0);
  }

  /** Dû au vendeur, en attente d'envoi par la plateforme. */
  get totalALiberer(): number {
    return this.ventes
      .filter((v) => v.statutVersement === 'EN_ATTENTE' || v.statutVersement === 'EN_COURS')
      .reduce((somme, v) => somme + (v.montantNet ?? 0), 0);
  }

  /** Effectivement reçu. */
  get totalVerse(): number {
    return this.ventes
      .filter((v) => v.statutVersement === 'CONFIRME')
      .reduce((somme, v) => somme + (v.montantNet ?? 0), 0);
  }

  // ── Actions vendeur ────────────────────────────────────────────────────────

  declarerPriseEnCharge(vente: MaVente): void {
    if (this.enCours.has(vente.itemId)) return;
    this.enCours.add(vente.itemId);

    this.livraisonService.declarerPriseEnCharge(vente.itemId).subscribe({
      next: (maj) => {
        this.remplacer(maj);
        this.enCours.delete(vente.itemId);
        this.toast.success(`« ${vente.animalNom} » est marqué en cours de livraison.`);
      },
      error: (e) => {
        this.enCours.delete(vente.itemId);
        this.toast.error(e?.error?.message ?? "La mise à jour a échoué.");
      },
    });
  }

  declarerDepot(vente: MaVente): void {
    if (this.enCours.has(vente.itemId)) return;
    this.enCours.add(vente.itemId);

    this.livraisonService.declarerDepot(vente.itemId).subscribe({
      next: (maj) => {
        this.remplacer(maj);
        this.enCours.delete(vente.itemId);
        this.toast.success(
          `« ${vente.animalNom} » est marqué livré. En attente de confirmation de l'acheteur.`,
        );
      },
      error: (e) => {
        this.enCours.delete(vente.itemId);
        this.toast.error(e?.error?.message ?? "La mise à jour a échoué.");
      },
    });
  }

  private remplacer(vente: MaVente): void {
    this.ventes = this.ventes.map((v) => (v.itemId === vente.itemId ? vente : v));
  }

  // ── Affichage ──────────────────────────────────────────────────────────────

  badgeClass(etat: EtatVente): string {
    const map: Record<EtatVente, string> = {
      A_REMETTRE: 'bg-[#FDF6EC] text-[#B96416]',
      EN_LIVRAISON: 'bg-[#FDF6EC] text-[#B96416]',
      EN_ATTENTE_CONFIRMATION: 'bg-[#F6F1E7] text-[#8B6F55]',
      FONDS_LIBERES: 'bg-[#E0EEE4] text-[#1B4332]',
      VERSEMENT_EN_COURS: 'bg-[#E0EEE4] text-[#1B4332]',
      VERSE: 'bg-[#E0EEE4] text-[#2D6A4F]',
      VERSEMENT_ECHOUE: 'bg-red-100 text-red-800',
      LITIGE: 'bg-red-100 text-red-800',
    };
    return map[etat] ?? 'bg-[#F6F1E7] text-gray-600';
  }

  etapes(vente: MaVente): { label: string; done: boolean }[] {
    const ordre = ['A_REMETTRE', 'EN_LIVRAISON', 'LIVRE', 'RECEPTIONNE'];
    const rang = ordre.indexOf(vente.statutLivraison);
    return [
      { label: 'Payé', done: true },
      { label: 'Pris en charge', done: rang >= 1 },
      { label: 'Livré', done: rang >= 2 },
      { label: 'Confirmé', done: rang >= 3 },
      { label: 'Versé', done: vente.statutVersement === 'CONFIRME' },
    ];
  }
}
