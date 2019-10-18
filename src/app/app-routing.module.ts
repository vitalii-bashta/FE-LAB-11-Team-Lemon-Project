import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes =  [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    // canActivate: [AuthGuardService]
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error-page/error-page.routing.module').then(m => m.ErrorPageRoutingModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.routing.module').then(m => m.UserProfileRoutingModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
