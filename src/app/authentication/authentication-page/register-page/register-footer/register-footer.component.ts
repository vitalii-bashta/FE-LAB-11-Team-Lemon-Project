import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-footer',
  templateUrl: './register-footer.component.html',
  styleUrls: ['./register-footer.component.scss']
})
export class RegisterFooterComponent implements OnInit {

  @Output()
  formChanged: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input() showLogForm: boolean;

  constructor() { }

  ngOnInit() {
  }

  onFormChanged(){
    this.showLogForm = true;
    this.formChanged.emit(this.showLogForm);
  }

}
