import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { inject } from '@angular/core';

export const successInterceptor: HttpInterceptorFn = (req, next) => {

  const messageService = inject(MessageService);

  if(req.url.includes('cart') && req.method == 'POST'){
    return next(req).pipe(
    tap({
      next: (res) => {
        if (res instanceof HttpResponse) {
          const body = res.body as { message?: string };
          const successMsg = body?.message;
          
          messageService.add({ 
            severity: 'success', 
            summary: 'Success', 
            detail: successMsg 
          });
        }
      }
    })
  );
  }else{
    return next(req);
  }
};
