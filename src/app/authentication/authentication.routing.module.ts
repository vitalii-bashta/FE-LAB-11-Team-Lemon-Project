import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-page/login.component';
import { RegisterComponent } from './register-page/register.component'
import { ForgotPassPageComponent } from './forgot-pass-page/forgot-pass-page.component';
import { AuthenticationPageComponent } from './authentication-page.component';

const routes: Routes = [
	{
		path: '',
		component: AuthenticationPageComponent,
		children: [
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{ path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forgotpass', component: ForgotPassPageComponent },
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }