import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthenticationService } from '../../../../core/services/authentication-service/authentication.service'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  errorMessage: string;
 
  registerForm = this.fb.group({
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
    this.auth.doRegister(value)
    .then(res => {
      this.errorMessage = "";
      this.router.navigate(['home']);
    }, err => {
      this.errorMessage = err.message;
    })
    this.registerForm.reset();
  }

}
