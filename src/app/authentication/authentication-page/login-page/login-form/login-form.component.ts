import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthenticationService } from '../../../../core/services/authentication-service/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  errorMessage: string;

  @Output()
  forgotPassFormChanged: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input() showForgotPassForm: boolean;  

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    public auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit(value){
    this.auth.doLogin(value)
    .then(res => {
      this.errorMessage = "";
      this.router.navigate(['home']);
    }, err => {
      this.errorMessage = err.message;
    })
    this.loginForm.reset();
  }

  onForgotPassFormChanged(){
    this.showForgotPassForm = true;
    this.forgotPassFormChanged.emit(this.showForgotPassForm);
  }

}
