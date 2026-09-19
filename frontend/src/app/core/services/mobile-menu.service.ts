// core/services/mobile-menu.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Etat du menu complet mobile (bottom sheet).
 *
 * Le bouton "Menu" vit dans la barre du bas d'AppComponent, alors que le contenu
 * du menu (entrees par role) vit dans HeaderComponent : ce service les relie.
 */
@Injectable({ providedIn: 'root' })
export class MobileMenuService {
  private readonly _open = new BehaviorSubject<boolean>(false);
  readonly open$ = this._open.asObservable();

  toggle(): void { this._open.next(!this._open.value); }
  close(): void  { if (this._open.value) this._open.next(false); }
}
