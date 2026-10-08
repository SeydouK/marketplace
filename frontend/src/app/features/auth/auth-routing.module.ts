import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MotDePasseOublieComponent } from './mot-de-passe-oublie/mot-de-passe-oublie.component';
import { ReinitialiserMotDePasseComponent } from './reinitialiser-mot-de-passe/reinitialiser-mot-de-passe.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Mot de passe oublié : demande du lien, puis choix du nouveau mot de passe.
  // Le lien reçu par email pointe sur la seconde route.
  { path: 'mot-de-passe-oublie', component: MotDePasseOublieComponent, title: 'Mot de passe oublié — BétailMarket' },
  { path: 'reinitialiser-mot-de-passe', component: ReinitialiserMotDePasseComponent, title: 'Nouveau mot de passe — BétailMarket' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
