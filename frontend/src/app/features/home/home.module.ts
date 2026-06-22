import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExperiencesComponent } from './experiences.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ServicesComponent } from './services.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, ExperiencesComponent, ServicesComponent],
  imports: [SharedModule, FormsModule, HomeRoutingModule],
})
export class HomeModule {}
