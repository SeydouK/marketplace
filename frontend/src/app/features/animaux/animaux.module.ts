import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AnimauxRoutingModule } from './animaux-routing.module';
import { CreerAnimalComponent } from './creer-animal/creer-animal.component';
import { ValidationSanitaireComponent } from './validation-sanitaire/validation-sanitaire.component';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    CreerAnimalComponent,
    ValidationSanitaireComponent,
  ],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, AnimauxRoutingModule, StepsModule],
})
export class AnimauxModule {}