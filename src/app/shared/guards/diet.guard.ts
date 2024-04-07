import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const dietGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const loggedUser = authService.loggedUser();
  if(!loggedUser) {
    router.navigate(["/login"]);
    return false;
  } else {
    let diets: any = localStorage.getItem("diets");
    if (!!diets) {
      diets = JSON.parse(diets);
    } else {
      diets = [];
    }
    if (diets.find((diet: { id: number; }) => diet.id === Number(childRoute.params["id"]))) {
      console.log(`Diet ID ${childRoute.params["id"]}.`)
      return true;
    }
    router.navigate([""]);
    console.log("Diet ID not found.");
    return false;
  }
};
