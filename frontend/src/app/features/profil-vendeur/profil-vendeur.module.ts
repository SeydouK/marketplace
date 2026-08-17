import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProfilVendeurComponent } from './profil-vendeur.component';

const routes: Routes = [
  { path: ':id', component: ProfilVendeurComponent, title: 'Profil éleveur — BétailMarket' },
];

@NgModule({
  declarations: [ProfilVendeurComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ProfilVendeurModule {}
