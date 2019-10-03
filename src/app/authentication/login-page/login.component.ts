import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    public auth: AuthenticationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  submit(value){
    this.auth.doLogin(value)
    .then(res => {
      this.errorMessage = "";
    }, err => {
      this.errorMessage = err.message;
    })
    this.loginForm.reset();
  }

}
