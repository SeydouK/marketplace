// acheteur/ticket-remise/ticket-remise.component.ts
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivraisonService } from '../../../shared/services/livraison.service';
import { ToastService } from '../../../core/services/toast.service';
import {
  TicketRemise,
  construireTickets,
  enregistrerTickets,
  formaterFcfa,
  libelleMode,
  libelleStatut,
  lireTickets,
  nommerAnimaux,
} from './ticket-remise.model';
import { dessinerTicket } from './ticket-image';

/**
 * Ticket de remise de l'acheteur.
 *
 * Le code de remise existait déjà dans « Mes achats », perdu au milieu de la
 * liste. Le jour J, l'acheteur doit pouvoir l'ouvrir en un geste, le montrer
 * en grand, l'enregistrer ou l'envoyer à la personne qui ira chercher
 * l'animal — y compris sans réseau sur le marché.
 *
 * Paramètres : `?commande=<id>` (lien de l'email, retour de paiement),
 * `?article=<id>` (depuis « Mes achats »), ou aucun pour tous les tickets actifs.
 */
@Component({
  selector: 'app-ticket-remise',
  templateUrl: './ticket-remise.component.html',
  standalone: false,
})
export class TicketRemiseComponent implements OnInit, OnDestroy {
  tickets: TicketRemise[] = [];
  actif: TicketRemise | null = null;

  chargement = true;
  /** Date de la copie locale affichée faute de réseau. */
  horsLigneDepuis: string | null = null;
  erreur = false;

  codeVisible = false;
  grandEcran = false;
  exportEnCours = false;

  private wakeLock: { release(): Promise<void> } | null = null;

  readonly libelleMode = libelleMode;
  readonly libelleStatut = libelleStatut;
  readonly nommerAnimaux = nommerAnimaux;
  readonly formaterFcfa = formaterFcfa;

  constructor(
    private route: ActivatedRoute,
    private livraisonService: LivraisonService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  ngOnDestroy(): void {
    this.libererEcran();
  }

  charger(): void {
    this.chargement = true;
    this.erreur = false;
    this.livraisonService.getMesAchats().subscribe({
      next: (achats) => {
        const tous = construireTickets(achats);
        enregistrerTickets(tous);
        this.horsLigneDepuis = null;
        this.afficher(tous);
        this.chargement = false;
      },
      error: () => {
        const copie = lireTickets();
        if (copie?.tickets.length) {
          this.horsLigneDepuis = copie.le;
          this.afficher(copie.tickets);
        } else {
          this.erreur = true;
        }
        this.chargement = false;
      },
    });
  }

  private afficher(tous: TicketRemise[]): void {
    const params = this.route.snapshot.queryParamMap;
    const commande = Number(params.get('commande'));
    const article = Number(params.get('article'));

    if (article) {
      this.tickets = tous.filter((t) => t.itemIds.includes(article));
    } else if (commande) {
      this.tickets = tous.filter((t) => t.commandeId === commande);
    } else {
      this.tickets = tous.filter((t) => !!t.code);
    }
    this.actif = this.tickets[0] ?? null;
  }

  choisir(ticket: TicketRemise): void {
    this.actif = ticket;
    this.codeVisible = false;
  }

  get remiseEffectuee(): boolean {
    return this.actif?.statutLivraison === 'RECEPTIONNE';
  }

  chiffres(ticket: TicketRemise): string[] {
    return (ticket.code ?? '').split('');
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  basculerCode(): void {
    this.codeVisible = !this.codeVisible;
  }

  async ouvrirGrandEcran(): Promise<void> {
    this.grandEcran = true;
    // L'écran ne doit pas s'éteindre pendant que le vendeur lit le code.
    try {
      const nav = navigator as Navigator & { wakeLock?: { request(t: 'screen'): Promise<{ release(): Promise<void> }> } };
      this.wakeLock = (await nav.wakeLock?.request('screen')) ?? null;
    } catch {
      this.wakeLock = null;
    }
  }

  fermerGrandEcran(): void {
    this.grandEcran = false;
    this.libererEcran();
  }

  @HostListener('document:keydown.escape')
  surEchap(): void {
    if (this.grandEcran) this.fermerGrandEcran();
  }

  private libererEcran(): void {
    this.wakeLock?.release().catch(() => undefined);
    this.wakeLock = null;
  }

  /**
   * Enregistre le ticket en image : feuille de partage du téléphone quand elle
   * accepte les fichiers (galerie, WhatsApp…), téléchargement sinon.
   */
  async enregistrerImage(): Promise<void> {
    if (!this.actif || this.exportEnCours) return;
    this.exportEnCours = true;
    try {
      const blob = await dessinerTicket(this.actif);
      const nom = `ticket-remise-${this.actif.reference.replace(/[^\w-]/g, '')}.png`;
      const fichier = new File([blob], nom, { type: 'image/png' });

      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare?.({ files: [fichier] })) {
        try {
          await navigator.share({ files: [fichier], title: 'Ticket de remise BétailMarket' });
          return;
        } catch (e) {
          if ((e as DOMException)?.name === 'AbortError') return;
        }
      }

      const url = URL.createObjectURL(blob);
      const lien = document.createElement('a');
      lien.href = url;
      lien.download = nom;
      document.body.appendChild(lien);
      lien.click();
      lien.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      this.toast.success('Ticket enregistré dans vos téléchargements.');
    } catch {
      this.toast.error("L'image n'a pas pu être créée. Réessayez.");
    } finally {
      this.exportEnCours = false;
    }
  }

  /** Message prêt à envoyer à la personne qui ira chercher l'animal. */
  get lienWhatsApp(): string {
    const t = this.actif;
    if (!t) return '';
    const lignes = [
      '*Ticket de remise BétailMarket*',
      `Commande ${t.reference}`,
      '',
      `Animal : ${nommerAnimaux(t)}`,
      `Vendeur : ${t.vendeurNom}`,
      `Remise : ${libelleMode(t.modeRemise)}${t.localisation ? ' — ' + t.localisation : ''}`,
      '',
      `Code de remise : *${t.code ?? ''}*`,
      '',
      "Important : ne donnez ce code qu'au moment où l'animal est entre vos mains. " +
        "C'est lui qui déclenche le paiement du vendeur.",
    ];
    return `https://wa.me/?text=${encodeURIComponent(lignes.join('\n'))}`;
  }
}
