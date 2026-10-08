import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { definePreset } from '@primeng/themes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { VerifyEmailComponent } from './features/verify-email/verify-email.component';
import { KycComponent } from './features/kyc/kyc.component';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';

// Montants et dates au format français : « 4 319 900 FCFA », « 6 oct. 2026 ».
// Sans cela, les pipes number et date appliquent la convention américaine.
//
// Une retouche : le séparateur de milliers français est l'espace fine
// insécable (U+202F), que la police Figtree dessine presque sans largeur —
// « 650 000 » s'afficherait « 650000 ». On lui substitue l'espace insécable
// ordinaire (U+00A0), de largeur normale et tout aussi insécable.
const ESPACE_FINE_INSECABLE = '\u202f';
const ESPACE_INSECABLE = '\u00a0';
const localeFrLisible = (localeFr as unknown[]).map((entree) =>
  Array.isArray(entree) && entree[0] === ',' && entree[1] === ESPACE_FINE_INSECABLE
    ? [entree[0], ESPACE_INSECABLE, ...entree.slice(2)]
    : entree,
);
registerLocaleData(localeFrLisible, 'fr');

/**
 * Thème PrimeNG aligné sur la marque : les composants PrimeNG (carrousel,
 * toasts, champs) reprennent le vert BétailMarket au lieu de la teinte par
 * défaut du thème Lara.
 */
const BetailMarketPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#F1F6F2',
      100: '#E2EEE6',
      200: '#C2DCCB',
      300: '#97C3A7',
      400: '#65A37D',
      500: '#2D6A4F',
      600: '#245540',
      700: '#1B4332',
      800: '#142F24',
      900: '#0F241B',
      950: '#0A1912',
    },
  },
});

@NgModule({
  declarations: [
    AppComponent, 
    KycComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    Toast,
  ],
  providers: [
    provideAnimationsAsync(),
    // darkModeSelector: false -> l'app n'a pas de theme sombre. Par defaut PrimeNG suit le
    // mode sombre du systeme et injecte `color-scheme: dark` : les champs de formulaire
    // deviennent noirs alors que le texte saisi reste fonce (illisible).
    providePrimeNG({ theme: { preset: BetailMarketPreset, options: { darkModeSelector: false } } }),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },

    /**
     * Service worker : uniquement hors developpement.
     *
     * En developpement il ferait plus de mal que de bien — il sert des bundles
     * mis en cache par-dessus ceux que le serveur vient de reconstruire, et on
     * passe la journee a se demander pourquoi une modification ne s'affiche pas.
     *
     * L'enregistrement est differe jusqu'a stabilite de l'application : il ne
     * doit pas entrer en concurrence avec le premier rendu, qui est deja lourd
     * sur un telephone d'entree de gamme.
     */
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}