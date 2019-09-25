import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthenticationService } from '../../core/services/authentication-service/authentication.service'

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss']
})
export class AuthenticationPageComponent implements OnInit {
  showLogForm: boolean = true;
  showForgotPassForm: boolean = false;

  constructor(
    public auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onFormChanging(showLogForm:boolean):void{
    this.showLogForm = showLogForm;
  }

  onForgotPassFormChanging(showForgotPassForm:boolean):void{
    this.showForgotPassForm = showForgotPassForm;
  }

  goHome(){
    this.router.navigate(['home']);
  }

}
