import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../../core/services/authentication-service/authentication.service'

@Component({
  selector: 'app-forgot-pass-form',
  templateUrl: './forgot-pass-form.component.html',
  styleUrls: ['./forgot-pass-form.component.scss']
})
export class ForgotPassFormComponent implements OnInit {
  errorMessage: string;

  @Output()
  forgotPassFormChanged: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input() showForgotPassForm: boolean;

  forgotPassForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    public auth: AuthenticationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  submit(value){
    this.auth.sendPass(value)
    .then(res => {
      this.errorMessage = "";
      this.onForgotPassFormChanged()
    }, err => {
      this.errorMessage = err.message;
    })
    this.forgotPassForm.reset();
  };

  onForgotPassFormChanged(){
    this.showForgotPassForm = false;
    this.forgotPassFormChanged.emit(this.showForgotPassForm);
  }

}
