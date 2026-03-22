import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnoncesRoutingModule } from './annonces-routing.module';
import { ListeAnnoncesComponent } from './liste-annonces/liste-annonces.component';
import { DetailAnnonceComponent } from './detail-annonce/detail-annonce.component';
import { CreerAnnonceComponent } from './creer-annonce/creer-annonce.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListeAnnoncesComponent,
    DetailAnnonceComponent,
    CreerAnnonceComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AnnoncesRoutingModule,
  ],
})
export class AnnoncesModule {}
