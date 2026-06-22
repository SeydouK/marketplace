// features/profil/profil.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MonProfilComponent } from './mon-profile/mon-profil.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ParametresComponent } from './parametres/parametres.component';

const routes: Routes = [
  { path: '', component: MonProfilComponent, canActivate: [AuthGuard] },
  { path: 'parametres', component: ParametresComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    MonProfilComponent,
    ParametresComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ProfilModule {}
