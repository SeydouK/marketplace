import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SellerRequestService } from '../../../core/services/seller-request.service';

@Component({
  selector: 'app-seller-request-modal',
  templateUrl: './seller-request-modal.component.html',
  standalone: false,
})
export class SellerRequestModalComponent {
  readonly open$: Observable<boolean>;

  constructor(public readonly svc: SellerRequestService) {
    this.open$ = svc.open$;
  }
}