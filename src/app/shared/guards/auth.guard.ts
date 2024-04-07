import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const loggedUser = authService.loggedUser();
  if(!loggedUser ) {
    console.log("Redirected to login page.")
    router.navigate(["/login"]);
    return false;
  } else {
    console.log(`${loggedUser.name} is logged in. Route: ${route}. State: ${state}`);
    return true;
  }
  return true;
};
