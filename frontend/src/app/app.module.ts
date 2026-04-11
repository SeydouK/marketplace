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

@NgModule({
  declarations: [
    AppComponent, 
    KycComponent,
    VerifyEmailComponent
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
