import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home-page/home-page.routing').then(m => m.HomePageRoutingModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error-page/error-page.routing.module').then(m => m.ErrorPageRoutingModule)    
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
