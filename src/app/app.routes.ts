import { Routes } from '@angular/router';
import { DietDetailComponent } from './diet-detail/diet-detail.component';
import { DietComponent } from './diet/diet.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './shared/guards/auth.guard';
import { dietGuard } from './shared/guards/diet.guard';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
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
    path: "diet",
    component: DietComponent,
    canActivate: [authGuard],
  },
  {
    path: "diet",
    canActivateChild: [dietGuard],
    loadChildren: () => import('./diet/diet.module').then(m => m.DietModule),

},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
];
