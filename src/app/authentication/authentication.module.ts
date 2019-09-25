import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthenticationPageRoutingModule } from './authentication-page/authentication.routing.module';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { LoginFormComponent } from './authentication-page/login-page/login-form/login-form.component';
import { LoginFooterComponent } from './authentication-page/login-page/login-footer/login-footer.component';
import { RegisterFooterComponent } from './authentication-page/register-page/register-footer/register-footer.component'
import { RegisterFormComponent } from './authentication-page/register-page/register-form/register-form.component'
import { ForgotPassFormComponent } from './authentication-page/forgot-pass-page/forgot-pass-form/forgot-pass-form.component'

const config = {
    apiKey: "AIzaSyApPcghIngJDa8YP3-ScI6US8iDHJfWGCU",
    authDomain: "fe-lab-11-team-lemon-project.firebaseapp.com",
    databaseURL: "https://fe-lab-11-team-lemon-project.firebaseio.com",
    projectId: "fe-lab-11-team-lemon-project",
    storageBucket: "fe-lab-11-team-lemon-project.appspot.com",
    messagingSenderId: "767898255223",
    appId: "1:767898255223:web:a38bf06ff389a449ba6b72"
}

@NgModule({
  declarations: [
    AuthenticationPageComponent,
    LoginFormComponent,
    LoginFooterComponent,
    RegisterFooterComponent,
    RegisterFormComponent,
    ForgotPassFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationPageRoutingModule, 
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ]
})
export class AuthenticationModule { }
