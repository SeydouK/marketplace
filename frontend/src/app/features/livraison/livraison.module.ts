import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LivraisonRoutingModule } from './livraison-routing.module';
import { DestinationComponent } from './destination/destination.component';
import { LivreurComponent } from './livreur/livreur.component';
import { SuiviComponent } from './suivi/suivi.component';

@NgModule({
  declarations: [DestinationComponent, LivreurComponent, SuiviComponent],
  imports: [SharedModule, FormsModule, LivraisonRoutingModule],
})
export class LivraisonModule {}
