import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  public information = [
    '+38 (097) 123-4567',
    "someEmail@pwc.com",
    "Lviv",
    "25 years old",
    "SirPlus"
  ]
  public skills = "Front-end developer, RPA developer";
  public aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a semper diam, vel laoreet arcu. Integer vestibulum, nibh vestibulum accumsan accumsan, ipsum elit luctus mauris, ac fermentum quam leo elementum quam. Fusce non elit porttitor, condimentum metus eget, facilisis lacus";
  

  constructor() { }

  ngOnInit() {
  }

}
