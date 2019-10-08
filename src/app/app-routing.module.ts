import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes =  [
  {
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
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
    path: 'event',
    loadChildren: () => import('./event/event.module').then(m => m.EventModule)    
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
