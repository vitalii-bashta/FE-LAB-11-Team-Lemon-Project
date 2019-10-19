import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private _authService: AuthenticationService, private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if ( this._authService.doLogin()) {
    //   return true;
    // } else
    // if( this._authService.googleSignin() ) {
    //   return true;
    // } else {
    //   confirm("Are you sign in?");
    // }

    let isSignin = confirm("Are you sign in?");
    if( isSignin === false) {
      this._router.navigate(['/authentication']);
      return false;
    }

    return isSignin;
    // this._router.navigate(['/authentication']);
    // return false;
  }
}
