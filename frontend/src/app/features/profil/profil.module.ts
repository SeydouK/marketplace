import { NgModule } from '@angular/core';
import { ProfilRoutingModule } from './profil-routing.module';
import { DashboardProprietaireComponent } from './dashboard-proprietaire/dashboard-proprietaire.component';
import { MesAnnoncesComponent } from './mes-annonces/mes-annonces.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DashboardProprietaireComponent, MesAnnoncesComponent],
  imports: [SharedModule, ProfilRoutingModule],
})
export class ProfilModule {}
