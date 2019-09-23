import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from 'src/app/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InformationComponent } from './user-profile/information/information.component';
import { OrganizationComponent } from './user-profile/organization/organization.component';
import { FeedbackComponent } from './user-profile/feedback/feedback.component';



@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    InformationComponent,
    OrganizationComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
