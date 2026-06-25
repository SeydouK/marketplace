import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ActualitesComponent } from './actualites.component';

const routes: Routes = [
  { path: '', component: ActualitesComponent, title: 'Actualités — BétailMarket' },
];

@NgModule({
  declarations: [ActualitesComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ActualitesModule {}
