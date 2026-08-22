import { NgModule } from '@angular/core';
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
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { VerifyEmailComponent } from './features/verify-email/verify-email.component';
import { KycComponent } from './features/kyc/kyc.component';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    providePrimeNG({ theme: { preset: Lara } }),
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