import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { InformationComponent } from './information/information.component';
import { OrganizationComponent } from './organization/organization.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes : Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: '', 
        redirectTo: 'information', 
        pathMatch: 'full'},

      {
        path: 'information',
        component: InformationComponent 
      },
      {
        path: 'organization',
        component: OrganizationComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      }
    ]
  }
  
]

@NgModule({
  declarations: [
    UserProfileComponent,
    InformationComponent,
    OrganizationComponent,
    FeedbackComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserProfileRoutingModule { }
