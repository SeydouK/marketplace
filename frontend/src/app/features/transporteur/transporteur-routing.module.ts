import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../core/models/role.enum';
import { DossierComponent } from './dossier/dossier.component';
import { MesCoursesComponent } from './mes-courses/mes-courses.component';

const routes: Routes = [
  { path: '', redirectTo: 'mes-courses', pathMatch: 'full' },
  { path: 'mes-courses', component: MesCoursesComponent },
  { path: 'dossier', component: DossierComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransporteurRoutingModule {}
