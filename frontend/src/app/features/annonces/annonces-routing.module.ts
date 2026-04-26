import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeAnnoncesComponent } from './liste-annonces/liste-annonces.component';
import { DetailAnnonceComponent } from './detail-annonce/detail-annonce.component';
import { CreerAnnonceComponent } from './creer-annonce/creer-annonce.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SellerGuard } from '../../core/guards/seller.guard';
import { KycGuard } from '../kyc/kyc.guard';

const routes: Routes = [
  { path: '', component: ListeAnnoncesComponent },
  { 
    path: 'creer', 
    component: CreerAnnonceComponent, 
    canActivate: [AuthGuard, SellerGuard, KycGuard] 
  },
  { path: ':id', component: DetailAnnonceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnoncesRoutingModule {}
