import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier.component';

const routes: Routes = [
  { path: '', component: PanierComponent, title: 'Mon Panier — BétailMarket' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PanierComponent  
  ],
})
export class PanierModule {}