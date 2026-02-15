import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Constants } from '../../constants/constants';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  const plat_id = inject(PLATFORM_ID);

  if (isPlatformBrowser(plat_id)) {

    const token = localStorage.getItem(Constants.userToken);

    if (token) {

      if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('users') || req.url.includes('wishlist')) {

        req = req.clone({
          setHeaders: {
            token: token
          }
        })

      }

    }


  }





  return next(req);
};
