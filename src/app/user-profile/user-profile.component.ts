import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../core/models/user.model';
import { HttpServiceUsers } from '../core/services/http-users.service';
import { map, first, take } from 'rxjs/operators';
import { ModalService } from './modal/modal.service';
import { AuthenticationService } from '../core';
import * as firebase from 'firebase';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  isActive = true;

  
  submitted = false;
  errorMessage = '';
  
  keyOfUserInDatabase: string;
  key: any;
  public userModel: User = {
    name: "NoName",
    email: this._authenticationService.getUser().providerData[0].uid,
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
    // email: this.key
  };
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _userService: HttpServiceUsers,
              private modalService: ModalService,
              public _authenticationService: AuthenticationService,) { 

              }

  ngOnInit() {
    this.key = this._authenticationService.getUser().providerData[0].uid;
    this.userData.email = this.key;
    console.log(this.userData.email);
    console.log(this.key);
    this.sub = this._userService.getUsers(`orderBy="email"&equalTo="${this.key}"`)
      .subscribe( users => { 
        if (Object.keys(users).length > 0) {
          this.keyOfUserInDatabase = Object.keys(users)[0];
          console.log(this.keyOfUserInDatabase);
          this.userData = users[this.keyOfUserInDatabase];
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.key);
    console.log(this.keyOfUserInDatabase)
    if (this.keyOfUserInDatabase) {
      this._userService.updateUser(this.keyOfUserInDatabase, this.userData).subscribe((result)=> console.log(result));
    } else {
      this._userService.pushUser(this.userData).subscribe((result)=> console.log(result));
      location.reload();
    }
    
    this.closeModal('custom-modal-1');
  }

  // showInformation() {
  //   this.router.navigate(['information'], {relativeTo: this.route});
  //   this.isActive = false;
  // }
  // showOrganization() {
  //   this.router.navigate(['organization'], {relativeTo: this.route});
  //   this.isActive = false;
  // }
  // showFeedback() {
  //   this.router.navigate(['feedback'], {relativeTo: this.route});
  //   this.isActive = false;
  // }

}
