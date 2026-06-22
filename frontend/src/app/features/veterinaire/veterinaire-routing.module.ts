// veterinaire/veterinaire-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardVeterinaireComponent } from './dashboard-veterinaire/dashboard-veterinaire.component';
import { CertificatsSanitairesComponent } from './certificats-sanitaires/certificats-sanitaires.component';
import { InspectionsComponent } from './inspections/inspections.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardVeterinaireComponent },
  { path: 'certificats', component: CertificatsSanitairesComponent },
  { path: 'inspections', component: InspectionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeterinaireRoutingModule {}
