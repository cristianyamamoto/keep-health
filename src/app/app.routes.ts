import { Routes } from '@angular/router';
import { DietDetailComponent } from './diet-detail/diet-detail.component';
import { DietComponent } from './diet/diet.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'diet',
    children: [
      { path: '', component: DietComponent },
      { path: ':id', component: DietDetailComponent },
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
];
