import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TransporteurRoutingModule } from './transporteur-routing.module';
import { DossierComponent } from './dossier/dossier.component';
import { MesCoursesComponent } from './mes-courses/mes-courses.component';

@NgModule({
  declarations: [DossierComponent, MesCoursesComponent],
  imports: [SharedModule, FormsModule, TransporteurRoutingModule],
})
export class TransporteurModule {}
