// anader/anader.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AnaderRoutingModule } from './anader-routing.module';
import { DashboardAnaderComponent } from './dashboard-anader/dashboard-anader.component';
import { ValidationEleveursComponent } from './validation-eleveurs/validation-eleveurs.component';
import { StatistiquesZoneComponent } from './statistiques-zone/statistiques-zone.component';

@NgModule({
  declarations: [
    DashboardAnaderComponent,
    ValidationEleveursComponent,
    StatistiquesZoneComponent,
  ],
  imports: [SharedModule, AnaderRoutingModule],
})
export class AnaderModule {}
