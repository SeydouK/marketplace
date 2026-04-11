// veterinaire/veterinaire.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { VeterinaireRoutingModule } from './veterinaire-routing.module';
import { DashboardVeterinaireComponent } from './dashboard-veterinaire/dashboard-veterinaire.component';
import { CertificatsSanitairesComponent } from './certificats-sanitaires/certificats-sanitaires.component';
import { InspectionsComponent } from './inspections/inspections.component';

@NgModule({
  declarations: [
    DashboardVeterinaireComponent,
    CertificatsSanitairesComponent,
    InspectionsComponent,
  ],
  imports: [SharedModule, VeterinaireRoutingModule],
})
export class VeterinaireModule {}
