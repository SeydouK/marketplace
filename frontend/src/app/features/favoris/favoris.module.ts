import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavorisComponent } from './favoris.component';
import { VisuelAnimalPipe } from '../../shared/pipes/visuel-animal.pipe';

@NgModule({
  declarations: [FavorisComponent],
  imports: [
    CommonModule,
    VisuelAnimalPipe,
    RouterModule.forChild([{ path: '', component: FavorisComponent }]),
  ],
})
export class FavorisModule {}