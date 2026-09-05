import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SellerRequestService } from '../../../core/services/seller-request.service';
import { Role } from '../../../core/models/role.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: false,
})
export class FooterComponent {
  year = new Date().getFullYear();

  constructor(
    public auth: AuthService,
    public sellerRequestSvc: SellerRequestService,
    private router: Router,
  ) {}

  get isAcheteur(): boolean {
    return this.auth.hasAnyRole([Role.USER, Role.ACHETEUR]);
  }

  handleSellerClick(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
    } else if (this.isAcheteur) {
      this.sellerRequestSvc.open();
    } else {
      this.router.navigate(['/annonces/creer']);
    }
  }

  handlePublishClick(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
    } else if (this.isAcheteur) {
      this.sellerRequestSvc.open();
    } else {
      this.router.navigate(['/annonces/creer']);
    }
  }
}