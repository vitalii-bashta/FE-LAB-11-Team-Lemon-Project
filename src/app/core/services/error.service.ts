import { Injectable, Injector, isDevMode } from '@angular/core'
import { ErrorHandler } from '@angular/core';
import { Router } from "@angular/router";

import { from } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  private router:Router;
  private inject:Injector;
  constructor(inject:Injector){
    this.inject = inject;
  }

  handleError(error) {
    if (isDevMode()) {
      this.router = this.inject.get(Router);
      this.router.navigate(['error']);
      console.error(error);    
    } else {
      console.error(error);   
    }
  }
}
