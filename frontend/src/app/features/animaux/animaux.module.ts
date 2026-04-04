import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AnimauxRoutingModule } from './animaux-routing.module';
import { CreerAnimalComponent } from './creer-animal/creer-animal.component';
import { MesAnimauxComponent } from './mes-animaux/mes-animaux.component';
import { ValidationSanitaireComponent } from './validation-sanitaire/validation-sanitaire.component';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    CreerAnimalComponent,
    MesAnimauxComponent,
    ValidationSanitaireComponent,
  ],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, AnimauxRoutingModule, StepsModule],
})
export class AnimauxModule {}
