import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { InformationComponent } from './information/information.component';
import { OrganizationComponent } from './organization/organization.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ModalModule } from './modal/modal.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const routes : Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: '', 
        redirectTo: 'information', 
        pathMatch: 'full'
      },
      {
        path: "information/:key",
        component: InformationComponent 
      },
      {
        path: 'organization/:key',
        component: OrganizationComponent
      },
      {
        path: 'feedback/:key',
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
    ModalModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class UserProfileRoutingModule { }
