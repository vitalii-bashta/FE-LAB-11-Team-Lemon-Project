import { Component, OnInit, Injector } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  private router:Router;
  private inject:Injector;
  constructor(inject:Injector){
    this.inject = inject;
  }
  ngOnInit() {
    this.router = this.inject.get(Router);
    let bindedMethod = this.router.navigate.bind(this.router,['home'])
    setTimeout(function ():void {
      bindedMethod()
    }, 5000);
  }
}
