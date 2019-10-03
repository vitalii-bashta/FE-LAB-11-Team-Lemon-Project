import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
      private afAuth: AngularFireAuth,
      private router: Router
  ) { 
  }

  googleSignin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.router.navigate(['home']);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.router.navigate(['home']);
      }, err => reject(err))
    })
  };

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.router.navigate(['home']);
      }, err => reject(err))
    })
  };

  sendPass(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(value.email)
      .then(res => {
        resolve(res);
        this.router.navigate(['authentication']);
      }, err => reject(err))
    })
  }

}
