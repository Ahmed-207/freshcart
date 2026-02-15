import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Constants } from '../../constants/constants';
import { UserDataDecoded } from '../../auth/models/user-data.interface';

export const userOrdersInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes('orders/user')) {
    const plat_id = inject(PLATFORM_ID);

    if (isPlatformBrowser(plat_id)) {

      const token = localStorage.getItem(Constants.userToken)

      if (token) {

        const userData: UserDataDecoded = jwtDecode(token);

        const userId: string = userData.id;

        const newURL = `${req.url}/${userId}`;

        req = req.clone({
          url: newURL
        })

      }


    }

  }


  return next(req);
};
