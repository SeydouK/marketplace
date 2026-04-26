import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { SellerGuard } from '../../core/guards/seller.guard';
import { Role } from '../../core/models/role.enum';
import { CreerAnimalComponent } from './creer-animal/creer-animal.component';
import { MesAnimauxComponent } from './mes-animaux/mes-animaux.component';
import { ValidationSanitaireComponent } from './validation-sanitaire/validation-sanitaire.component';
import { KycGuard } from '../kyc/kyc.guard';

const routes: Routes = [
  { path: '', redirectTo: 'mes-animaux', pathMatch: 'full' },
  { path: 'creer', component: CreerAnimalComponent, canActivate: [AuthGuard, SellerGuard, KycGuard] },
  { path: ':id/editer', component: CreerAnimalComponent, canActivate: [AuthGuard, SellerGuard, KycGuard] },
  { path: 'mes-animaux', component: MesAnimauxComponent, canActivate: [AuthGuard] },
  {
    path: 'validation',
    component: ValidationSanitaireComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        // Role.AGENT_ANADER,
        Role.VETERINAIRE,
        // Role.ADMIN,
        // Role.ADMINISTRATEUR,
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimauxRoutingModule {}
