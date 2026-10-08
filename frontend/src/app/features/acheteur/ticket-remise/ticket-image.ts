// acheteur/ticket-remise/ticket-image.ts
import {
  TicketRemise,
  formaterFcfa,
  libelleMode,
  nommerAnimaux,
} from './ticket-remise.model';

/**
 * Dessine le ticket en image (PNG, 1080 × 1600), pour la galerie du téléphone
 * ou un envoi WhatsApp à la personne qui ira chercher l'animal.
 *
 * Dessiné directement sur un canvas plutôt que par capture du DOM : pas de
 * dépendance, un rendu identique sur tous les téléphones, et aucune image
 * d'une autre origine (la photo vient de l'API) qui « teinterait » le canvas
 * et en interdirait l'export.
 */

const C = {
  fond: '#F4F0E8',
  carte: '#FFFFFF',
  vert: '#1B4332',
  vertDoux: '#F1F6F2',
  vertBord: '#C2DCCB',
  dore: '#ECB867',
  encre: '#1F1C17',
  encre2: '#5B5348',
  encre3: '#8A8174',
  ligne: '#E8E2D6',
  alerte: '#9A5B0E',
  alerteDoux: '#FCF3E3',
  alerteBord: '#F1D6A6',
};

const SANS = '"Figtree Variable", Figtree, system-ui, sans-serif';
const TITRE = '"Fraunces Variable", Fraunces, Georgia, serif';

const PATTE =
  'M12 12.5c-2.9 0-5.5 2.1-5.5 4.6 0 1.7 1.3 2.9 3 2.9.9 0 1.6-.4 2.5-.4s1.6.4 2.5.4c1.7 0 3-1.2 3-2.9 0-2.5-2.6-4.6-5.5-4.6zM7.4 8.1c-.4-1.6-1.6-2.7-2.8-2.4-1.2.3-1.8 1.8-1.4 3.4.4 1.6 1.6 2.7 2.8 2.4 1.2-.3 1.8-1.8 1.4-3.4zM11.2 6.6c.3-1.7-.4-3.2-1.6-3.4C8.4 3 7.3 4.2 7 5.9c-.3 1.7.4 3.2 1.6 3.4 1.2.2 2.3-1 2.6-2.7zM16.6 8.1c.4-1.6 1.6-2.7 2.8-2.4 1.2.3 1.8 1.8 1.4 3.4-.4 1.6-1.6 2.7-2.8 2.4-1.2-.3-1.8-1.8-1.4-3.4zM12.8 6.6c-.3-1.7.4-3.2 1.6-3.4 1.2-.2 2.3 1 2.6 2.7.3 1.7-.4 3.2-1.6 3.4-1.2.2-2.3-1-2.6-2.7z';

export async function dessinerTicket(ticket: TicketRemise): Promise<Blob> {
  await Promise.all([
    document.fonts.load(`600 52px ${TITRE}`),
    document.fonts.load(`600 30px ${SANS}`),
    document.fonts.load(`800 30px ${SANS}`),
  ]).catch(() => undefined);

  const L = 1080;
  const H = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = L;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Fond
  ctx.fillStyle = C.fond;
  ctx.fillRect(0, 0, L, H);

  // Carte
  const x = 70;
  const y = 70;
  const l = L - 2 * x;
  const h = H - 2 * y;
  rectangle(ctx, x, y, l, h, 40);
  ctx.fillStyle = C.carte;
  ctx.fill();

  // Bandeau de marque
  ctx.save();
  rectangle(ctx, x, y, l, 190, { tl: 40, tr: 40, br: 0, bl: 0 });
  ctx.fillStyle = C.vert;
  ctx.fill();
  ctx.restore();

  rectangle(ctx, x + 60, y + 55, 80, 80, 22);
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fill();
  ctx.save();
  ctx.translate(x + 60 + 16, y + 55 + 16);
  ctx.scale(2, 2);
  ctx.fillStyle = C.dore;
  ctx.fill(new Path2D(PATTE));
  ctx.restore();

  ctx.textBaseline = 'middle';
  ctx.font = `600 50px ${TITRE}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('Bétail', x + 165, y + 96);
  const largeurBetail = ctx.measureText('Bétail').width;
  ctx.fillStyle = C.dore;
  ctx.fillText('Market', x + 165 + largeurBetail, y + 96);

  ctx.textAlign = 'right';
  ctx.font = `700 22px ${SANS}`;
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  espacer(ctx, 3);
  ctx.fillText('TICKET DE REMISE', x + l - 60, y + 78);
  espacer(ctx, 0);
  ctx.font = `600 30px ${SANS}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`Commande ${ticket.reference}`, x + l - 60, y + 118);
  ctx.textAlign = 'left';

  // Animal
  let curseur = y + 270;
  etiquette(ctx, 'ANIMAL', x + 60, curseur);
  ctx.font = `600 58px ${TITRE}`;
  ctx.fillStyle = C.encre;
  ctx.textBaseline = 'alphabetic';
  ecrireTronque(ctx, nommerAnimaux(ticket), x + 60, curseur + 72, l - 120);
  const detail = [ticket.animaux[0]?.race, ticket.animaux.length > 1 ? `${ticket.animaux.length} animaux` : null]
    .filter(Boolean)
    .join(' · ');
  if (detail) {
    ctx.font = `500 30px ${SANS}`;
    ctx.fillStyle = C.encre2;
    ecrireTronque(ctx, detail, x + 60, curseur + 122, l - 120);
  }

  // Grille d'informations
  curseur += 190;
  ctx.strokeStyle = C.ligne;
  ctx.lineWidth = 2;
  ligne(ctx, x + 60, curseur, x + l - 60, curseur);
  const colonne = (l - 120) / 2;
  const cases: [string, string][] = [
    ['VENDEUR', ticket.vendeurNom],
    ['MODE DE REMISE', libelleMode(ticket.modeRemise)],
    ['LIEU', ticket.localisation || 'À convenir'],
    ['MONTANT PROTÉGÉ', formaterFcfa(ticket.montant)],
  ];
  cases.forEach(([titre, valeur], i) => {
    const cx = x + 60 + (i % 2) * colonne;
    const cy = curseur + 60 + Math.floor(i / 2) * 130;
    etiquette(ctx, titre, cx, cy);
    ctx.font = `600 34px ${SANS}`;
    ctx.fillStyle = C.encre;
    ctx.textBaseline = 'alphabetic';
    ecrireTronque(ctx, valeur, cx, cy + 52, colonne - 30);
  });

  // Perforation
  curseur += 320;
  ctx.fillStyle = C.fond;
  for (const cx of [x, x + l]) {
    ctx.beginPath();
    ctx.arc(cx, curseur, 34, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.save();
  ctx.setLineDash([16, 14]);
  ctx.strokeStyle = C.ligne;
  ctx.lineWidth = 3;
  ligne(ctx, x + 60, curseur, x + l - 60, curseur);
  ctx.restore();

  // Code
  curseur += 90;
  ctx.textAlign = 'center';
  ctx.font = `700 24px ${SANS}`;
  ctx.fillStyle = C.encre3;
  espacer(ctx, 4);
  ctx.textBaseline = 'middle';
  ctx.fillText('CODE DE REMISE', L / 2, curseur);
  espacer(ctx, 0);

  const code = (ticket.code ?? '----').split('');
  const caseL = 160;
  const caseH = 200;
  const ecart = 28;
  const total = code.length * caseL + (code.length - 1) * ecart;
  let cx = (L - total) / 2;
  curseur += 50;
  for (const chiffre of code) {
    rectangle(ctx, cx, curseur, caseL, caseH, 28);
    ctx.fillStyle = C.vertDoux;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = C.vertBord;
    ctx.stroke();
    ctx.font = `800 120px ${SANS}`;
    ctx.fillStyle = C.vert;
    ctx.fillText(chiffre, cx + caseL / 2, curseur + caseH / 2 + 6);
    cx += caseL + ecart;
  }
  ctx.textAlign = 'left';

  // Avertissement
  curseur += caseH + 50;
  rectangle(ctx, x + 60, curseur, l - 120, 150, 24);
  ctx.fillStyle = C.alerteDoux;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = C.alerteBord;
  ctx.stroke();
  ctx.fillStyle = C.alerte;
  ctx.font = `700 30px ${SANS}`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Ne donnez ce code qu’au moment où', x + 100, curseur + 62);
  ctx.fillText('l’animal est entre vos mains.', x + 100, curseur + 104);

  // Pied du ticket
  curseur += 230;
  ctx.font = `500 26px ${SANS}`;
  ctx.fillStyle = C.encre3;
  ctx.textAlign = 'center';
  const paye = ticket.paidAt ? `Payé le ${new Date(ticket.paidAt).toLocaleDateString('fr-FR')} · ` : '';
  ctx.fillText(`${paye}Fonds bloqués par BétailMarket jusqu’à la remise`, L / 2, curseur);

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Export impossible'))), 'image/png'),
  );
}

// ── Outils de dessin ─────────────────────────────────────────────────────────

type Rayons = number | { tl: number; tr: number; br: number; bl: number };

function rectangle(ctx: CanvasRenderingContext2D, x: number, y: number, l: number, h: number, r: Rayons): void {
  const { tl, tr, br, bl } = typeof r === 'number' ? { tl: r, tr: r, br: r, bl: r } : r;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + l - tr, y);
  ctx.quadraticCurveTo(x + l, y, x + l, y + tr);
  ctx.lineTo(x + l, y + h - br);
  ctx.quadraticCurveTo(x + l, y + h, x + l - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}

function ligne(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function etiquette(ctx: CanvasRenderingContext2D, texte: string, x: number, y: number): void {
  ctx.font = `700 22px ${SANS}`;
  ctx.fillStyle = C.encre3;
  ctx.textBaseline = 'alphabetic';
  espacer(ctx, 2.5);
  ctx.fillText(texte, x, y);
  espacer(ctx, 0);
}

/** `letterSpacing` n'existe pas partout (Safari ancien) : sans lui, le texte reste lisible. */
function espacer(ctx: CanvasRenderingContext2D, px: number): void {
  const c = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  if ('letterSpacing' in c) c.letterSpacing = `${px}px`;
}

function ecrireTronque(ctx: CanvasRenderingContext2D, texte: string, x: number, y: number, max: number): void {
  let t = texte;
  if (ctx.measureText(t).width > max) {
    while (t.length > 1 && ctx.measureText(t + '…').width > max) t = t.slice(0, -1);
    t = t.trimEnd() + '…';
  }
  ctx.fillText(t, x, y);
}
