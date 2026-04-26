import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Carousel } from 'primeng/carousel';
import { SharedModule } from '../../../shared/shared.module';
import { ListeAnnoncesComponent } from './liste-annonces.component';

@NgModule({
  declarations: [ListeAnnoncesComponent],
  imports: [SharedModule, FormsModule, Carousel],
  exports: [ListeAnnoncesComponent],
})
export class ListeAnnoncesModule {}
