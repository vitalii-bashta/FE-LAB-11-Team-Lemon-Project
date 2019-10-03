import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login-page/login.component';
import { RegisterComponent } from './register-page/register.component';
import { ForgotPassPageComponent } from './forgot-pass-page/forgot-pass-page.component';
import { AuthenticationPageComponent } from './authentication-page.component';
import { AuthenticationRoutingModule } from './authentication.routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPassPageComponent,
    AuthenticationPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
  ]
})
export class AuthenticationModule { }
