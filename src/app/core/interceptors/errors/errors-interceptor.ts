import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { inject } from '@angular/core';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const messageService = inject(MessageService);
  return next(req).pipe(catchError((err: HttpErrorResponse) => {

    const errorMessage = err.error.message ;

    messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });


    return throwError(() => err)
  }));
};
