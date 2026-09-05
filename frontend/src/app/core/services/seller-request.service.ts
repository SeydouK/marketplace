// core/services/seller-request.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class SellerRequestService {
  private readonly _open = new BehaviorSubject<boolean>(false);
  readonly open$ = this._open.asObservable();

  submitting = false;

  constructor(private auth: AuthService, private toast: ToastService) {}

  open(): void {
    if (this.auth.canAccessSellerArea || this.auth.isSellerRequestPending) return;
    this._open.next(true);
  }

  close(): void {
    if (this.submitting) return;
    this._open.next(false);
  }

  submit(): void {
    if (this.submitting || this.auth.canAccessSellerArea || this.auth.isSellerRequestPending) return;

    this.submitting = true;
    this.auth.requestSellerAccess().subscribe({
      next: () => {
        this.submitting = false;
        this._open.next(false);
        this.toast.success('Votre demande vendeur a été transmise à l\'administration.');
      },
      error: () => {
        this.submitting = false;
      },
    });
  }
}