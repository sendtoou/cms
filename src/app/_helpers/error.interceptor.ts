import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   return next.handle(req).pipe(catchError(err => {
  //     const error = err.error.message || err.statusText;
  //     return throwError(error);
  // }));




    // return next.handle(req)
    // .pipe(
    //   retry(1),
    //   catchError((error: HttpErrorResponse) => {
    //       let errorMessage = '';
    //       if (error.error instanceof ErrorEvent) {
    //           // client-side error
    //           errorMessage = `Error: ${error.error.message}`;
    //       } else {
    //           // server-side(backend) error
    //           errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    //       }
    //       console.log(errorMessage);
    //       return throwError(errorMessage);
    //   })
    // );

    return next.handle(req)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          let errorMessage = '';
          let errorHttpMessage = '';
          if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred. Handle it accordingly.
              console.error('An error occurred Error Event naja:', error.error.message);
              errorMessage = `Error: ${error.error.message}`;
          } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong
              // console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error.message}`);
              console.log(`error status : ${error.status} ${error.statusText}`);
              // errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
              errorHttpMessage = error.status + error.statusText;
              errorMessage = errorHttpMessage + ' resCode:' + error.error.resCode + ' resMessage:' + error.error.resMessage;
              switch (error.status) {
                case 401:      // unauthorized
                this.authService.clearSessionToken();
                this.router.navigate(['/login']);
                console.log('Unauthorized redirect to login');
                break;
                case 403:     // forbidden
                this.authService.clearSessionToken();
                this.router.navigate(['/login']);
                console.log('Forbidden redirect to login');
                break;
              }
          }
          return throwError(errorMessage);
        } else {
          console.error('Something else happened naja');
        }
        console.error('error naja:', error);
        return throwError(error);
      })
    );

  }
}
