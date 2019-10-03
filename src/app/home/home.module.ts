import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventsComponent } from './components/events/events.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { AdressesComponent } from './components/adresses/adresses.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomePageRoutingModule } from './home-page.routing.module';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    EventsComponent,
    VolunteersComponent,
    OrganizationsComponent,
    AdressesComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ]
})
export class HomeModule {}
