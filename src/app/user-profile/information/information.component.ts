import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/user-profile/modal/modal.service';

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


  constructor(public _router: Router,
              public _authenticationService: AuthenticationService,
              private modalService: ModalService)
              { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.email = this._authenticationService.isLoggInEmail();
  }

  logOut() {
    firebase.auth().signOut();
    this._router.navigate(['home']);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
