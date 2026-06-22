import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperiencesComponent } from './experiences.component';
import { HomeComponent } from './home.component';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'experiences', component: ExperiencesComponent },
  { path: 'services', component: ServicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
