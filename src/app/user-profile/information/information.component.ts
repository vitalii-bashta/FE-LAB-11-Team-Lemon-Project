import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
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

  // bodyText: string;

  // information = {};
  // informationDefault = {
  //   'mobile': '+38 (097) 123-4567',
  //   'email': 'someEmail@pwc.com',
  //   'city': 'Lviv',
  //   'age': '25 years old',
  //   'memberOf': 'SirPlus'
  // }

  // public skills = "Front-end developer, RPA developer";
  // public aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a semper diam, vel laoreet arcu. Integer vestibulum, nibh vestibulum accumsan accumsan, ipsum elit luctus mauris, ac fermentum quam leo elementum quam. Fusce non elit porttitor, condimentum metus eget, facilisis lacus";

  // key: string;
  // email1$: any;
  // currentUser$: any;
  // currentUserEmail$: Observable<firebase.User>;

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
    // this.bodyText = 'This text can be updated in modal 1';
    this.email$ = this._authenticationService.isLoggInEmail();

    // console.log(this.auth.user);

    // this.currentUserEmail$ = this.auth.user;
    // this.currentUser$ = this.currentUserEmail$.pipe(
    //   share(),
    //   mergeMap((character:any) => {
    //     console.log(character);
    //     return this._httpServiceUsers.getUsers(`orderBy="email"&equalTo="${character.email}"`)
    //   }
    // ));

    // // this.information = this._httpServiceUsers.getUser().subscribe()
    // this._route.paramMap.subscribe((params) => {
    //   this.key = params.get("key");
    // })

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
