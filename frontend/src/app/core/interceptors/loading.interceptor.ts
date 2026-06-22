import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  private loadingTimeout: any;

  constructor(private loading: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.activeRequests++;

    if (this.activeRequests === 1) {
      this.loadingTimeout = setTimeout(() => {
        if (this.activeRequests > 0) {
          this.loading.setLoading(true);
        }
      }, 200);
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;

        if (this.activeRequests < 0) {
          this.activeRequests = 0;
        }

        if (this.activeRequests === 0) {
          if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
            this.loadingTimeout = null;
          }
          this.loading.setLoading(false);
        }
      })
    );
  }
}
