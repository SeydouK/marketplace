import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavorisComponent } from './favoris.component';

@NgModule({
  declarations: [FavorisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FavorisComponent }]),
  ],
})
export class FavorisModule {}