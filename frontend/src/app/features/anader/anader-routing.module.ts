// anader/anader-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAnaderComponent } from './dashboard-anader/dashboard-anader.component';
import { ValidationEleveursComponent } from './validation-eleveurs/validation-eleveurs.component';
import { StatistiquesZoneComponent } from './statistiques-zone/statistiques-zone.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardAnaderComponent },
  { path: 'validation', component: ValidationEleveursComponent },
  { path: 'statistiques', component: StatistiquesZoneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnaderRoutingModule {}
