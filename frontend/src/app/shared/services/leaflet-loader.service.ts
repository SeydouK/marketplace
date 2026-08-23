// shared/services/leaflet-loader.service.ts
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';

/**
 * Donne accès à Leaflet, chargé statiquement par angular.json.
 *
 * Un repli runtime existe pour le cas où le bundle statique n'aurait pas été
 * évalué (chargement différé, échec réseau ponctuel) : sans lui, la carte reste
 * vide sans que rien ne l'explique.
 *
 * Centralisé ici parce que la même logique existait déjà en double dans
 * liste-annonces et creer-animal — une troisième copie aurait garanti la dérive.
 */
@Injectable({ providedIn: 'root' })
export class LeafletLoaderService {
  private chargement?: Promise<any>;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  charger(): Promise<any> {
    const dejaPresent = (window as any).L;
    if (dejaPresent) return Promise.resolve(dejaPresent);

    if (this.chargement) return this.chargement;

    this.injecterCss();
    this.chargement = new Promise((resolve, reject) => {
      const existant = this.document.querySelector(
        'script[data-leaflet-runtime="true"]',
      ) as HTMLScriptElement | null;

      if (existant) {
        existant.addEventListener('load', () => resolve((window as any).L));
        existant.addEventListener('error', () => reject(new Error('Leaflet indisponible')));
        return;
      }

      const script = this.document.createElement('script');
      script.src = '/assets/vendor/leaflet/leaflet.js';
      script.async = true;
      script.dataset['leafletRuntime'] = 'true';
      script.onload = () => resolve((window as any).L);
      script.onerror = () => reject(new Error('Leaflet indisponible'));
      this.document.body.appendChild(script);
    }).catch((erreur) => {
      // Ne pas mémoriser l'échec : une coupure réseau passagère ne doit pas
      // condamner la carte pour toute la session.
      this.chargement = undefined;
      throw erreur;
    });

    return this.chargement;
  }

  private injecterCss(): void {
    if (this.document.querySelector('link[data-leaflet-runtime="true"]')) return;
    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/vendor/leaflet/leaflet.css';
    link.dataset['leafletRuntime'] = 'true';
    this.document.head.appendChild(link);
  }

  /**
   * Fond de carte, identique partout dans l'application.
   *
   * Le fournisseur vient de l'environnement : changer de source de tuiles — pour
   * une instance auto-hébergée, ou un service payant — ne doit pas demander de
   * toucher au code, et surtout pas de le faire carte par carte.
   *
   * L'attribution n'est pas décorative : la licence ODbL des données
   * OpenStreetMap l'exige. Elle doit rester visible sur chaque carte.
   */
  fondDeCarte(L: any): any {
    const tuiles = environment.carte.tuiles;
    return L.tileLayer(tuiles.url, {
      maxZoom: tuiles.maxZoom,
      attribution: tuiles.attribution,
    });
  }

  /**
   * Pastille orientée : la même, avec un repère indiquant la direction suivie.
   *
   * Le cap change la lecture de la carte. Une pastille seule dit « il est là » ;
   * la même avec sa flèche dit « il est là et il vient vers vous » — ou « il
   * s'éloigne », ce qui vaut d'être vu tout de suite.
   *
   * Sans cap connu (à l'arrêt, ou matériel qui ne le fournit pas), on retombe
   * sur la pastille simple plutôt que de pointer une direction inventée.
   */
  pastilleOrientee(L: any, couleur: string, icone: string, capDegres?: number | null): any {
    if (capDegres == null) return this.pastille(L, couleur, icone);

    return L.divIcon({
      className: '',
      html: `<div style="position:relative;width:46px;height:46px">
             <div style="position:absolute;inset:0;transform:rotate(${capDegres}deg)">
               <div style="position:absolute;top:0;left:50%;margin-left:-6px;width:0;height:0;
                    border-left:6px solid transparent;border-right:6px solid transparent;
                    border-bottom:9px solid ${couleur};
                    filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))"></div>
             </div>
             <div style="position:absolute;top:6px;left:6px;width:34px;height:34px;border-radius:50%;
                  background:${couleur};border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);
                  display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px">
               <i class="pi ${icone}"></i></div>
             </div>`,
      iconSize: [46, 46],
      iconAnchor: [23, 23],
    });
  }

  /** Pastille colorée, plus lisible qu'une épingle sur fond de ville. */
  pastille(L: any, couleur: string, icone: string): any {
    return L.divIcon({
      className: '',
      html: `<div style="width:34px;height:34px;border-radius:50%;background:${couleur};
             border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;
             align-items:center;justify-content:center;color:#fff;font-size:15px">
             <i class="pi ${icone}"></i></div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });
  }
}
