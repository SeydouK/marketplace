// admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { GestionAnnoncesComponent } from './gestion-annonces/gestion-annonces.component';
import { GestionLitigesComponent } from './gestion-litiges/gestion-litiges.component';
import { GestionTransactionsComponent } from './gestion-transactions/gestion-transactions.component';
import { GestionTransporteursComponent } from './gestion-transporteurs/gestion-transporteurs.component';
import { GestionVersementsComponent } from './gestion-versements/gestion-versements.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardAdminComponent },
  { path: 'utilisateurs', component: GestionUtilisateursComponent },
  { path: 'annonces', component: GestionAnnoncesComponent },
  { path: 'litiges', component: GestionLitigesComponent },
  { path: 'transactions', component: GestionTransactionsComponent },
  { path: 'versements', component: GestionVersementsComponent },
  { path: 'transporteurs', component: GestionTransporteursComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
