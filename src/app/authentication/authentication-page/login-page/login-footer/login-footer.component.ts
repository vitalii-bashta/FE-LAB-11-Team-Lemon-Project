import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-footer',
  templateUrl: './login-footer.component.html',
  styleUrls: ['./login-footer.component.scss']
})
export class LoginFooterComponent implements OnInit {

  @Output()
  formChanged: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input() showLogForm: boolean;

  constructor() { }

  ngOnInit() {
  }

  onFormChanged(){
    this.showLogForm = false;
    this.formChanged.emit(this.showLogForm);
  }

}
