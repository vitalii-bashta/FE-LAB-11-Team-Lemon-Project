import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, HttpServiceUsers } from 'src/app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  email: Promise<any>;

  bodyText: string;

  information = {
    'mobile': '+38 (097) 123-4567',
    'email': 'someEmail@pwc.com',
    'city': 'Lviv',
    'age': '25 years old',
    'memberOf': 'SirPlus'
  }

  public skills = "Front-end developer, RPA developer";
  public aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a semper diam, vel laoreet arcu. Integer vestibulum, nibh vestibulum accumsan accumsan, ipsum elit luctus mauris, ac fermentum quam leo elementum quam. Fusce non elit porttitor, condimentum metus eget, facilisis lacus";

  key: string;


  constructor(public _router: Router,
              public _route: ActivatedRoute,
              public _authenticationService: AuthenticationService,
              public _httpServiceUsers: HttpServiceUsers)
              { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.email = this._authenticationService.isLoggInEmail();

    // this.information = this._httpServiceUsers.getUser().subscribe()
    this._route.paramMap.subscribe((params) => {
      this.key = params.get("key");
    })
    
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
