import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationPageComponent } from './authentication-page.component';

const routes : Routes = [
  {
    path: '',
    component: AuthenticationPageComponent
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationPageRoutingModule { }