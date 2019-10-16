import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  email: Promise<any>;

  information = {
    'mobile': '+38 (097) 123-4567',
    'email': 'someEmail@pwc.com',
    'city': 'Lviv',
    'age': '25 years old',
    'memberOf': 'SirPlus'
  }

  // public information = [
  //   '+38 (097) 123-4567',
  //   'someEmail@pwc.com',
  //   'Lviv',
  //   "25 years old",
  //   "SirPlus"
  // ]

  public skills = "Front-end developer, RPA developer";
  public aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a semper diam, vel laoreet arcu. Integer vestibulum, nibh vestibulum accumsan accumsan, ipsum elit luctus mauris, ac fermentum quam leo elementum quam. Fusce non elit porttitor, condimentum metus eget, facilisis lacus";


  constructor(public _router: Router,
              public _authenticationService: AuthenticationService)
              { }

  ngOnInit() {
    this.email = this._authenticationService.isLoggInEmail();
  }

  logOut() {
    firebase.auth().signOut();
    this._router.navigate(['home']);
  }

}
