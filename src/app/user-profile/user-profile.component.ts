import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../core/models/user.model';
import { HttpServiceUsers } from '../core/services/http-users.service';
import { map } from 'rxjs/operators';
import { ModalService } from './modal/modal.service';
import { AuthenticationService } from '../core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  isActive = true;
  public fullName = "Robin Smith";
  userData;

  user

  public userModel: User = {
    name: "NoName",
    email: "bratok3000@gmail.com",
    avatarUrl: "https://firebasestorage.googleapis.com/v0/b/fe-lab-11-team-lemon-project.appspot.com/o/login%2Fuser.png?alt=media&token=4191f126-938c-4ef7-813b-f7d6956b4f27",
    mobile: "5555555555",
    city: "MiddleOfNowhere",
    age: 100,
    memberOf: "Gang",
    skills: "No skills",
    aboutMe: "Nothing about me",
    organizations: ["No organizations"],
    feedback: ""
  }
  submitted = false;
  errorMessage = '';
  key: any;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private _userService: HttpServiceUsers,
              private modalService: ModalService,
              public _authenticationService: AuthenticationService,) { 
                // this.route.params.subscribe( params => console.log(params))
                this.key = this._authenticationService.getUser().uid;
              }

  ngOnInit() {
    console.log(this._authenticationService.getUser());
    
    // this.router.navigate(['/information'], this.key);
   
    // this.userModel = this._userService.getUser().subscribe();
    console.log(this.userData);
  }


  ngOnDestroy() {
    this.userData.uns
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onSubmit() {
    this.submitted = true;
    this._userService.pushUser(this.userModel).subscribe((result)=> console.log(result));
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
