import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthAsideComponent } from './auth-aside/auth-aside.component';
import { MotDePasseOublieComponent } from './mot-de-passe-oublie/mot-de-passe-oublie.component';
import { ReinitialiserMotDePasseComponent } from './reinitialiser-mot-de-passe/reinitialiser-mot-de-passe.component';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthAsideComponent,
    MotDePasseOublieComponent,
    ReinitialiserMotDePasseComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    InputText,
    Button,
  ],
})
export class AuthModule {}
