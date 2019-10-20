import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { EventsComponent } from './components/events/events.component';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["authentication"]);

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
		children: [
			{ path: '', redirectTo: 'events', pathMatch: 'full' },
			{ path: 'events', component: EventsComponent },
      {
        path: 'user-profile',
        loadChildren: () => import('../user-profile/user-profile.routing.module').then(m => m.UserProfileRoutingModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin}
      }
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
