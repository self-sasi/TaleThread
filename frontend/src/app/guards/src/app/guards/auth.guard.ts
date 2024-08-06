import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  let userToken: string | null = null;

  if (typeof window !== 'undefined') {
    userToken = localStorage.getItem('token');
  }

  if (userToken) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }

};
