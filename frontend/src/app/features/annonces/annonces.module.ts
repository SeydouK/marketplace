import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AnnoncesRoutingModule } from './annonces-routing.module';
import { ListeAnnoncesModule } from './liste-annonces/liste-annonces.module';
import { DetailAnnonceComponent } from './detail-annonce/detail-annonce.component';
import { CreerAnnonceComponent } from './creer-annonce/creer-annonce.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DetailAnnonceComponent,
    CreerAnnonceComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ListeAnnoncesModule,
    AnnoncesRoutingModule,
  ],
})
export class AnnoncesModule {}
