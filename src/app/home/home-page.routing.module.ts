import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component';
import { AdressesComponent } from './components/adresses/adresses.component';
import { EventsComponent } from './components/events/events.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
		children: [
			{ path: '', redirectTo: 'events', pathMatch: 'full' },
			{ path: 'events', component: EventsComponent },
      {
        path: 'user-profile',
        loadChildren: () => import('../user-profile/user-profile.routing.module').then(m => m.UserProfileRoutingModule)
      },
      { path: 'volunteers', component: VolunteersComponent },
      { path: 'organizations', component: OrganizationsComponent },
      { path: 'adresses', component: AdressesComponent },
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
