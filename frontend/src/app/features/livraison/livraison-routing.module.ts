import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { DestinationComponent } from './destination/destination.component';
import { LivreurComponent } from './livreur/livreur.component';
import { SuiviComponent } from './suivi/suivi.component';

const routes: Routes = [
  // Acheteur : choisir le mode et l'adresse, puis suivre le trajet.
  { path: 'destination/:remiseId', component: DestinationComponent, canActivate: [AuthGuard] },
  { path: 'suivi/:remiseId', component: SuiviComponent, canActivate: [AuthGuard] },
  // Vendeur : l'ecran garde ouvert pendant la conduite.
  { path: 'livreur/:remiseId', component: LivreurComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivraisonRoutingModule {}
