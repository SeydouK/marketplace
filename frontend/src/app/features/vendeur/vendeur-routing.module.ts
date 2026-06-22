// vendeur/vendeur-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardVendeurComponent } from './dashboard-vendeur/dashboard-vendeur.component';
import { MesAnnoncesComponent } from './mes-annonces/mes-annonces.component';
import { MesVentesComponent } from './mes-ventes/mes-ventes.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardVendeurComponent },
  { path: 'mes-annonces', component: MesAnnoncesComponent },
  { path: 'mes-ventes', component: MesVentesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurRoutingModule {}
