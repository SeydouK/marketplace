// shared/pipes/asset-url.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Rend absolue une URL de fichier renvoyée par le backend.
 *
 * Le backend stocke et renvoie toujours un chemin relatif (`/api/files/...`),
 * quel que soit le support réel (disque en dev, bucket Backblaze B2 en prod) :
 * les octets transitent par `/api/files/**`, jamais par une URL de bucket.
 *
 * En local, le proxy Angular fait suivre `/api` vers le backend, donc un chemin
 * relatif fonctionne tel quel. En production, le front est sur Netlify et le
 * backend sur Render : un chemin relatif viserait Netlify, dont la règle SPA
 * `/*  ->  /index.html` répond **200 avec du HTML**. Le navigateur reçoit alors
 * une page à la place d'une image et n'affiche rien — sans erreur visible dans
 * l'onglet réseau, ce qui rend la panne difficile à diagnostiquer.
 *
 * Préfixer l'origine de l'API supprime cette ambiguïté.
 */
@Pipe({ name: 'assetUrl', standalone: true })
export class AssetUrlPipe implements PipeTransform {
  private static readonly API_ORIGIN = environment.apiUrl.replace(/\/api$/, '');

  transform(url?: string | null, fallback = ''): string {
    if (!url) return fallback;
    // Une URL déjà absolue (ancienne donnée, ou lien externe) est laissée intacte.
    if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('assets/')) {
      return url;
    }
    return `${AssetUrlPipe.API_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
  }
}
