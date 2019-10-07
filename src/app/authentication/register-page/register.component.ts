import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;

  registerForm = this.fb.group({
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
    this.auth.doRegister(value)
    .then(res => {
      this.errorMessage = "";
    }, err => {
      this.errorMessage = err.message;
    })
    this.registerForm.reset();
  }

}
