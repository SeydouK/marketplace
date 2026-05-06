// features/anader/anader.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AnaderRoutingModule } from './anader-routing.module';
import { DashboardAnaderComponent } from './dashboard-anader/dashboard-anader.component';

@NgModule({
  declarations: [
    DashboardAnaderComponent,
    // ValidationEleveursComponent,   // à décommenter quand le composant sera créé
    // StatistiquesZoneComponent,     // à décommenter quand le composant sera créé
  ],
  imports: [
    SharedModule,
    AnaderRoutingModule,
  ],
})
export class AnaderModule {}