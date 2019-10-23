import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService, HttpServiceUsers } from 'src/app/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { share, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  email$: Promise<any>;

  keyOfUserInDatabase: string;
  key: any;
  public userModel: User = {
    name: "NoName",
    email: this.key,
    avatarUrl: "https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/login%2Fuser.png?alt=media&token=4191f126-938c-4ef7-813b-f7d6956b4f27",
    mobile: "0000000000",
    city: "MiddleOfNowhere",
    age: 0,
    memberOf: "Gang",
    skills: "No skills",
    aboutMe: "Nothing about me",
    organizations: ["No organizations"],
    feedback: ""
  }
  userData: User = {
    email: this.key
  };
  sub: Subscription;


  constructor(public _router: Router,
              public _route: ActivatedRoute,
              private _userService: HttpServiceUsers,
              public _authenticationService: AuthenticationService,)
              { }

  ngOnInit() {
    this.email$ = this._authenticationService.isLoggInEmail();

    this.key = this._authenticationService.getUser().providerData[0].uid;

    this.sub = this._userService.getUsers(`orderBy="email"&equalTo="${this.key}"`)
      .subscribe( users => { 
        if (Object.keys(users).length > 0) {
          this.keyOfUserInDatabase = Object.keys(users)[0];
          console.log(this.keyOfUserInDatabase);
          this.userData = users[this.keyOfUserInDatabase];
          let dbref = firebase.database().ref("users/" + this.keyOfUserInDatabase);
          dbref.on('value', snap => this.userData = snap.val());
          // console.log(this.userData);
          // this.userData.name = users[this.keyOfUserInDatabase].name;
          // this.userData.avatarUrl = users[this.keyOfUserInDatabase].avatarUrl;
        } else {
          this.userData = this.userModel;
          // this.userData.name = this.userModel.name;
          // this.userData.avatarUrl = this.userModel.avatarUrl;
        }
      });
  }

  logOut() {
    firebase.auth().signOut();
    this._router.navigate(['home']);
  }

  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }
}
