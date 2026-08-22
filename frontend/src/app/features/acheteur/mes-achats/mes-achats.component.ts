// acheteur/mes-achats/mes-achats.component.ts
import { Component, OnInit } from '@angular/core';
import {
  LivraisonService,
  MonAchat,
  MonAchatItem,
  EtatAchat,
} from '../../../shared/services/livraison.service';
import { ToastService } from '../../../core/services/toast.service';

type Onglet = 'EN_COURS' | 'TERMINE' | 'ALL';

@Component({
  selector: 'app-mes-achats',
  templateUrl: './mes-achats.component.html',
  standalone: false,
})
export class MesAchatsComponent implements OnInit {
  achats: MonAchat[] = [];
  chargement = true;
  erreur = false;

  activeTab: Onglet = 'EN_COURS';
  tabs: { label: string; value: Onglet }[] = [
    { label: 'En cours', value: 'EN_COURS' },
    { label: 'Terminés', value: 'TERMINE' },
    { label: 'Tous', value: 'ALL' },
  ];

  /** Article dont le litige est en cours de saisie. */
  litigeItem: MonAchatItem | null = null;
  litigeMotif = '';
  litigeEnvoi = false;

  /** Ids des articles dont une action est en vol, pour désactiver le bouton. */
  enCours = new Set<number>();

  /** Frises dépliées, par identifiant d'article. */
  frisesOuvertes = new Set<number>();

  /** Codes révélés — masqués par défaut pour éviter la lecture par-dessus l'épaule. */
  codesReveles = new Set<number>();

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
    this.livraisonService.getMesAchats().subscribe({
      next: (achats) => {
        this.achats = achats;
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

  private filtrer(tab: Onglet): MonAchat[] {
    const clos = (a: MonAchat) => a.etatGlobal === 'TERMINE' || a.etatGlobal === 'ANNULE';
    if (tab === 'ALL') return this.achats;
    if (tab === 'TERMINE') return this.achats.filter(clos);
    return this.achats.filter((a) => !clos(a));
  }

  get achatsFiltres(): MonAchat[] {
    return this.filtrer(this.activeTab);
  }

  compteOnglet(tab: Onglet): number {
    return this.filtrer(tab).length;
  }

  // ── Actions acheteur ───────────────────────────────────────────────────────

  confirmerReception(item: MonAchatItem): void {
    if (this.enCours.has(item.id)) return;
    this.enCours.add(item.id);

    this.livraisonService.confirmerReception(item.id).subscribe({
      next: (achat) => {
        this.remplacer(achat);
        this.enCours.delete(item.id);
        this.toast.success(
          `Réception de « ${item.animalNom} » confirmée. Les fonds vont être versés au vendeur.`,
        );
      },
      error: (e) => {
        this.enCours.delete(item.id);
        this.toast.error(e?.error?.message ?? 'La confirmation a échoué. Réessayez.');
      },
    });
  }

  ouvrirFormulaireLitige(item: MonAchatItem): void {
    this.litigeItem = item;
    this.litigeMotif = '';
  }

  annulerLitige(): void {
    this.litigeItem = null;
    this.litigeMotif = '';
  }

  envoyerLitige(): void {
    if (!this.litigeItem || !this.litigeMotif.trim() || this.litigeEnvoi) return;
    this.litigeEnvoi = true;

    this.livraisonService.ouvrirLitige(this.litigeItem.id, this.litigeMotif.trim()).subscribe({
      next: (achat) => {
        this.remplacer(achat);
        this.litigeEnvoi = false;
        this.annulerLitige();
        this.toast.success('Litige enregistré. Les fonds sont gelés le temps de l’arbitrage.');
      },
      error: (e) => {
        this.litigeEnvoi = false;
        this.toast.error(e?.error?.message ?? "L'ouverture du litige a échoué.");
      },
    });
  }

  /** Remplace la commande modifiée sans recharger toute la liste. */
  private remplacer(achat: MonAchat): void {
    this.achats = this.achats.map((a) => (a.id === achat.id ? achat : a));
  }

  // ── Affichage ──────────────────────────────────────────────────────────────

  badgeClass(etat: EtatAchat): string {
    const map: Record<EtatAchat, string> = {
      EN_ATTENTE_PAIEMENT: 'bg-[#F6F1E7] text-[#8B6F55]',
      EN_ATTENTE_LIVRAISON: 'bg-[#FDF6EC] text-[#B96416]',
      PRET: 'bg-[#E0EEE4] text-[#1B4332]',
      ECHEC_LIVRAISON: 'bg-red-100 text-red-800',
      EN_LIVRAISON: 'bg-[#FDF6EC] text-[#B96416]',
      A_CONFIRMER: 'bg-[#E0EEE4] text-[#1B4332]',
      TERMINE: 'bg-[#E0EEE4] text-[#2D6A4F]',
      LITIGE: 'bg-red-100 text-red-800',
      ANNULE: 'bg-[#F6F1E7] text-gray-500',
    };
    return map[etat] ?? 'bg-[#F6F1E7] text-gray-600';
  }

  /** Étapes du parcours, pour le fil d'avancement d'un article. */
  etapes(item: MonAchatItem): { label: string; done: boolean }[] {
    const ordre = ['A_REMETTRE', 'PRET', 'EN_LIVRAISON', 'LIVRE', 'RECEPTIONNE'];
    const rang = ordre.indexOf(item.statutLivraison);
    return [
      { label: 'Payé', done: true },
      { label: 'Prêt', done: rang >= 1 },
      { label: 'En route', done: rang >= 2 },
      { label: 'Reçu', done: rang >= 4 },
    ];
  }

  basculerFrise(item: MonAchatItem): void {
    if (this.frisesOuvertes.has(item.id)) {
      this.frisesOuvertes.delete(item.id);
    } else {
      this.frisesOuvertes.add(item.id);
    }
  }

  basculerCode(item: MonAchatItem): void {
    if (this.codesReveles.has(item.id)) {
      this.codesReveles.delete(item.id);
    } else {
      this.codesReveles.add(item.id);
    }
  }

  /** Les fonds sont-ils encore retenus par la plateforme pour cet article ? */
  fondsSequestres(item: MonAchatItem): boolean {
    return item.statutLivraison !== 'RECEPTIONNE';
  }
}
