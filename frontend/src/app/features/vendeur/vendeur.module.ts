// vendeur/vendeur.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { VendeurRoutingModule } from './vendeur-routing.module';
import { DashboardVendeurComponent } from './dashboard-vendeur/dashboard-vendeur.component';
import { MesAnnoncesComponent } from './mes-annonces/mes-annonces.component';
import { MesVentesComponent } from './mes-ventes/mes-ventes.component';

@NgModule({
  declarations: [
    DashboardVendeurComponent,
    MesAnnoncesComponent,
    MesVentesComponent,
  ],
  imports: [SharedModule, VendeurRoutingModule],
})
export class VendeurModule {}
