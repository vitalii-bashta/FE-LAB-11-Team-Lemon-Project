import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventsComponent } from './components/events/events.component';
import { HomePageRoutingModule } from './home-page.routing.module';
import { UserProfileRoutingModule } from '../user-profile/user-profile.routing.module';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    EventsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    UserProfileRoutingModule
  ]
})
export class HomeModule {}
