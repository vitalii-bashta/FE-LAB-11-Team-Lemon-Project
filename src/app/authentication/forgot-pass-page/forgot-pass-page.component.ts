import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthenticationService } from 'src/app/core';

@Component({
  selector: 'app-forgot-pass-page',
  templateUrl: './forgot-pass-page.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class ForgotPassPageComponent implements OnInit {
  errorMessage: string;

  forgotPassForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    public auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit(value){
    this.auth.sendPass(value)
    .then(res => {
      this.errorMessage = "";
    }, err => {
      this.errorMessage = err.message;
    })
    this.forgotPassForm.reset();
  };

}
