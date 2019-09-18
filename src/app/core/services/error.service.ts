import { Injectable,Injector, isDevMode,ErrorHandler } from '@angular/core'
import { Router } from "@angular/router";

import { from } from 'rxjs';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private router:Router;
  private inject:Injector;
  constructor(inject:Injector){
    this.inject = inject;
  }

  handleError(error) {
    console.error(error); 
    if (!isDevMode()) {
      this.router = this.inject.get(Router);
      this.router.navigate(['error']);
    }
  }
}
