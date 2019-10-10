import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CoreModule } from 'src/app/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }