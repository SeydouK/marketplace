// acheteur/acheteur-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAcheteurComponent } from './dashboard-acheteur/dashboard-acheteur.component';
import { MesAchatsComponent } from './mes-achats/mes-achats.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardAcheteurComponent },
  { path: 'mes-achats', component: MesAchatsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcheteurRoutingModule {}
