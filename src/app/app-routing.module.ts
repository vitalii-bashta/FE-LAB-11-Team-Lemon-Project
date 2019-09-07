import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home/home-page/home-page.component'; 


const routes: Routes = [
  {
    path: '', 
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomePageComponent,
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
