import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../core/models/role.enum';
import { CreerAnimalComponent } from './creer-animal/creer-animal.component';
import { MesAnimauxComponent } from './mes-animaux/mes-animaux.component';
import { ValidationSanitaireComponent } from './validation-sanitaire/validation-sanitaire.component';

const routes: Routes = [
  { path: '', redirectTo: 'mes-animaux', pathMatch: 'full' },
  { path: 'creer', component: CreerAnimalComponent, canActivate: [AuthGuard] },
  { path: ':id/editer', component: CreerAnimalComponent, canActivate: [AuthGuard] },
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
