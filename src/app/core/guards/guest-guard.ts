import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Constants } from '../constants/constants';
import { isPlatformBrowser } from '@angular/common';

export const guestGuard: CanActivateFn = (route, state) => {


  const platform_ID = inject(PLATFORM_ID);

  const router = inject(Router);

  if (isPlatformBrowser(platform_ID)) {

    if (!localStorage.getItem(Constants.userToken)) {
      return true
    } else {
      return router.parseUrl('/home');
    }
  }
  return true;

};
