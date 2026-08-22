// vendeur/mes-ventes/mes-ventes.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import {
  LivraisonService,
  MaVente,
  EtatVente,
} from '../../../shared/services/livraison.service';
import { ToastService } from '../../../core/services/toast.service';
import {
  LIBELLES_VEHICULE,
  TransporteurDisponible,
  TransporteurService,
} from '../../transporteur/services/transporteur.service';

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

  /** Frises dépliées, par identifiant d'article. */
  frisesOuvertes = new Set<number>();

  // ── Saisie du code de remise ───────────────────────────────────────────────
  remiseVente: MaVente | null = null;
  codeSaisi = '';
  photoFichier: File | null = null;
  photoApercu: string | null = null;
  remiseEnCours = false;

  // ── Déclaration d'échec ────────────────────────────────────────────────────
  echecVente: MaVente | null = null;
  echecMotif = '';
  echecEnCours = false;

  // ── Confier a un transporteur ──────────────────────────────────────────────
  transporteurVente: MaVente | null = null;
  transporteurs: TransporteurDisponible[] = [];
  chargementTransporteurs = false;
  propositionEnCours = false;
  readonly libellesVehicule = LIBELLES_VEHICULE;

  constructor(
    private livraisonService: LivraisonService,
    private transporteurService: TransporteurService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
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
        return this.ventes.filter(
          (v) => v.statutLivraison === 'A_REMETTRE' || v.statutLivraison === 'PRET',
        );
      case 'EN_ATTENTE':
        return this.ventes.filter(
          (v) =>
            v.etatGlobal === 'EN_LIVRAISON' ||
            v.etatGlobal === 'EN_ATTENTE_CONFIRMATION' ||
            v.etatGlobal === 'ECHEC_LIVRAISON',
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

  // ── Infobulles des KPI ─────────────────────────────────────────────────────

  /**
   * Quelle explication est ouverte, s'il y en a une.
   *
   * Une infobulle au survol seul serait inatteignable au doigt, et c'est sur
   * téléphone que ces montants sont le plus souvent consultés. D'où un bouton
   * qui ouvre et ferme, plutôt qu'un effet de souris.
   */
  infoOuverte: 'sequestre' | 'recevoir' | 'verse' | null = null;

  basculerInfo(cle: 'sequestre' | 'recevoir' | 'verse', evenement: MouseEvent): void {
    // Sans cela, le clic remonte jusqu'au document et referme aussitôt ce qu'il
    // vient d'ouvrir.
    evenement.stopPropagation();
    this.infoOuverte = this.infoOuverte === cle ? null : cle;
  }

  @HostListener('document:click')
  fermerInfo(): void {
    this.infoOuverte = null;
  }

  @HostListener('document:keydown.escape')
  fermerInfoAuClavier(): void {
    this.infoOuverte = null;
  }

  /**
   * Ce qui a été retenu sur les ventes déjà payées : frais de paiement et
   * commission réunis.
   *
   * Calculé à partir des montants réels — brut moins net — plutôt qu'en
   * réappliquant les taux ici. Un taux dupliqué dans l'interface finit toujours
   * par diverger de celui appliqué au versement, et c'est le genre d'écart qui
   * se remarque sur un relevé.
   */
  get totalRetenues(): number {
    return this.ventes
      .filter((v) => v.statutVersement)
      .reduce((somme, v) => somme + ((v.montantBrut ?? 0) - (v.montantNet ?? 0)), 0);
  }

  /** Prix de vente cumulé, avant retenues. */
  get totalBrut(): number {
    return this.ventes
      .filter((v) => v.statutVersement)
      .reduce((somme, v) => somme + (v.montantBrut ?? 0), 0);
  }

  /** Effectivement reçu. */
  get totalVerse(): number {
    return this.ventes
      .filter((v) => v.statutVersement === 'CONFIRME')
      .reduce((somme, v) => somme + (v.montantNet ?? 0), 0);
  }

  // ── Frise ──────────────────────────────────────────────────────────────────

  basculerFrise(vente: MaVente): void {
    if (this.frisesOuvertes.has(vente.itemId)) {
      this.frisesOuvertes.delete(vente.itemId);
    } else {
      this.frisesOuvertes.add(vente.itemId);
    }
  }

  // ── Préparation ────────────────────────────────────────────────────────────

  declarerPret(vente: MaVente): void {
    this.executer(vente, this.livraisonService.declarerPret(vente.itemId),
      `« ${vente.animalNom} » est signalé prêt. L'acheteur est prévenu.`);
  }

  declarerPriseEnCharge(vente: MaVente): void {
    this.executer(vente, this.livraisonService.declarerPriseEnCharge(vente.itemId),
      `« ${vente.animalNom} » est marqué en cours de livraison.`);
  }

  private executer(vente: MaVente, appel: any, succes: string): void {
    if (this.enCours.has(vente.itemId)) return;
    this.enCours.add(vente.itemId);

    appel.subscribe({
      next: (maj: MaVente) => {
        this.remplacer(maj);
        this.enCours.delete(vente.itemId);
        this.toast.success(succes);
      },
      error: (e: any) => {
        this.enCours.delete(vente.itemId);
        this.toast.error(e?.error?.message ?? 'La mise à jour a échoué.');
      },
    });
  }

  // ── Remise par code ────────────────────────────────────────────────────────

  ouvrirRemise(vente: MaVente): void {
    this.remiseVente = vente;
    this.codeSaisi = '';
    this.photoFichier = null;
    this.photoApercu = null;
  }

  fermerRemise(): void {
    this.remiseVente = null;
    this.codeSaisi = '';
    this.photoFichier = null;
    this.photoApercu = null;
  }

  choisirPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fichier = input.files?.[0];
    if (!fichier) return;

    this.photoFichier = fichier;
    const lecteur = new FileReader();
    lecteur.onload = () => (this.photoApercu = lecteur.result as string);
    lecteur.readAsDataURL(fichier);
  }

  get remisePrete(): boolean {
    return this.codeSaisi.trim().length === 4 && this.photoFichier !== null;
  }

  /**
   * Envoie la photo puis valide le code.
   *
   * L'ordre compte : la photo doit exister avant la validation, puisque le back
   * refuse une remise sans preuve.
   */
  validerRemise(): void {
    if (!this.remiseVente || !this.photoFichier || !this.remisePrete || this.remiseEnCours) return;
    this.remiseEnCours = true;

    const vente = this.remiseVente;
    this.livraisonService.uploadPhotoRemise(this.photoFichier).subscribe({
      next: ({ url }) => {
        this.livraisonService
          .validerRemise(vente.commandeId, [vente.itemId], this.codeSaisi.trim(), url)
          .subscribe({
            next: () => {
              this.remiseEnCours = false;
              this.fermerRemise();
              this.toast.success(
                `Remise de « ${vente.animalNom} » confirmée. Vos fonds sont débloqués.`,
              );
              this.charger();
            },
            error: (e) => {
              this.remiseEnCours = false;
              this.toast.error(e?.error?.message ?? 'Le code n’a pas été accepté.');
            },
          });
      },
      error: () => {
        this.remiseEnCours = false;
        this.toast.error("L'envoi de la photo a échoué. Réessayez.");
      },
    });
  }

  // ── Échec de remise ────────────────────────────────────────────────────────

  ouvrirEchec(vente: MaVente): void {
    this.echecVente = vente;
    this.echecMotif = '';
  }

  fermerEchec(): void {
    this.echecVente = null;
    this.echecMotif = '';
  }

  envoyerEchec(): void {
    if (!this.echecVente || !this.echecMotif.trim() || this.echecEnCours) return;
    this.echecEnCours = true;

    const vente = this.echecVente;
    this.livraisonService.declarerEchec(vente.itemId, this.echecMotif.trim()).subscribe({
      next: (maj) => {
        this.remplacer(maj);
        this.echecEnCours = false;
        this.fermerEchec();
        this.toast.success("Échec enregistré. L'acheteur est prévenu.");
      },
      error: (e) => {
        this.echecEnCours = false;
        this.toast.error(e?.error?.message ?? "L'enregistrement a échoué.");
      },
    });
  }

  // ── Transporteurs ──────────────────────────────────────────────────────────

  /**
   * Ouvre la liste des transporteurs disponibles.
   *
   * La liste est rechargee a chaque ouverture : la disponibilite change en
   * permanence, et proposer une course a quelqu'un qui vient d'accepter ailleurs
   * ne produirait qu'un refus incomprehensible.
   */
  ouvrirTransporteurs(vente: MaVente): void {
    this.transporteurVente = vente;
    this.chargementTransporteurs = true;
    this.transporteurs = [];

    this.transporteurService.disponibles().subscribe({
      next: (liste) => {
        this.transporteurs = liste;
        this.chargementTransporteurs = false;
      },
      error: () => {
        this.chargementTransporteurs = false;
        this.toast.error('Impossible de charger les transporteurs.');
      },
    });
  }

  fermerTransporteurs(): void {
    this.transporteurVente = null;
    this.transporteurs = [];
  }

  proposerA(transporteur: TransporteurDisponible): void {
    if (!this.transporteurVente?.remiseId || this.propositionEnCours) return;
    this.propositionEnCours = true;

    const vente = this.transporteurVente;
    this.transporteurService.proposerCourse(vente.remiseId!, transporteur.id).subscribe({
      next: () => {
        this.propositionEnCours = false;
        this.fermerTransporteurs();
        this.toast.success(
          `Course proposée à ${transporteur.nom}. Il doit l'accepter avant de partir.`,
        );
        this.charger();
      },
      error: (e) => {
        this.propositionEnCours = false;
        this.toast.error(e?.error?.message ?? 'La proposition a échoué.');
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
      PRET: 'bg-[#E0EEE4] text-[#1B4332]',
      EN_LIVRAISON: 'bg-[#FDF6EC] text-[#B96416]',
      EN_ATTENTE_CONFIRMATION: 'bg-[#F6F1E7] text-[#8B6F55]',
      ECHEC_LIVRAISON: 'bg-red-100 text-red-800',
      FONDS_LIBERES: 'bg-[#E0EEE4] text-[#1B4332]',
      VERSEMENT_EN_COURS: 'bg-[#E0EEE4] text-[#1B4332]',
      VERSE: 'bg-[#E0EEE4] text-[#2D6A4F]',
      VERSEMENT_ECHOUE: 'bg-red-100 text-red-800',
      LITIGE: 'bg-red-100 text-red-800',
    };
    return map[etat] ?? 'bg-[#F6F1E7] text-gray-600';
  }

  etapes(vente: MaVente): { label: string; done: boolean }[] {
    const ordre = ['A_REMETTRE', 'PRET', 'EN_LIVRAISON', 'LIVRE', 'RECEPTIONNE'];
    const rang = ordre.indexOf(vente.statutLivraison);
    return [
      { label: 'Payé', done: true },
      { label: 'Prêt', done: rang >= 1 },
      { label: 'En route', done: rang >= 2 },
      { label: 'Remis', done: rang >= 4 },
      { label: 'Versé', done: vente.statutVersement === 'CONFIRME' },
    ];
  }

  /** Le vendeur peut-il encore encaisser cette vente par code ? */
  remisableParCode(vente: MaVente): boolean {
    return (
      vente.statutLivraison !== 'RECEPTIONNE' &&
      vente.statutLivraison !== 'LITIGE' &&
      vente.statutVersement === 'BLOQUE'
    );
  }
}
