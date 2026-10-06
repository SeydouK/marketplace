// acheteur/acheteur.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AcheteurRoutingModule } from './acheteur-routing.module';
import { DashboardAcheteurComponent } from './dashboard-acheteur/dashboard-acheteur.component';
import { MesAchatsComponent } from './mes-achats/mes-achats.component';
import { TicketRemiseComponent } from './ticket-remise/ticket-remise.component';
import { FormsModule } from '@angular/forms';
//
@NgModule({
  declarations: [
    DashboardAcheteurComponent,
    MesAchatsComponent,
    TicketRemiseComponent,
  ],
  imports: [SharedModule, AcheteurRoutingModule, FormsModule],
})
export class AcheteurModule {}
