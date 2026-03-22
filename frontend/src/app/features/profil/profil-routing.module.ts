import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardProprietaireComponent } from './dashboard-proprietaire/dashboard-proprietaire.component';
import { MesAnnoncesComponent } from './mes-annonces/mes-annonces.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardProprietaireComponent },
  { path: 'mes-annonces', component: MesAnnoncesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilRoutingModule {}
