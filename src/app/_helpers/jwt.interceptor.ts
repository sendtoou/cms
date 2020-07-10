import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, throwError, Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  renewAccessToken: boolean;

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // req = this.addTokenHeader(req);
  //   return next.handle(req).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.log(error);
  //       if (error.status === 401 && !this.refreshingAccessToken) {
  //       return this.newAccessToken()
  //       .pipe(
  //         switchMap(() => {
  //           req = this.addTokenHeader(req);
  //           return next.handle(req);
  //         }),
  //         catchError((err: any) => {
  //           console.log(err);
  //           this.authService.logout();
  //           return empty();
  //         })
  //       );
  //       }
  //       return throwError(error);
  //     })
  //   );
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();
    const isAccessTokenExpired = this.authService.isAccessTokenExpired();
    // if refreshToken is expired req will go to error interceptor(401), so just check accessToken is expired
    if ( accessToken && refreshToken ) {
      // if accessToken is expired and not continue call renew infinite loop, request newAccessToken
      if ( isAccessTokenExpired && !this.renewAccessToken ) {
        return this.newAccessToken().pipe(
          switchMap(() => {
            req = this.addNewTokenHeader(req);
            return next.handle(req);
          })
        );
      }
    }
    return next.handle(req);
  }


 newAccessToken() {
    this.renewAccessToken = true;
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        this.renewAccessToken = false;
        console.log('renew accesstoken naja');
      })
    );

  }

  addNewTokenHeader(req: HttpRequest<any>) {
    const token = this.authService.getAccessToken();
    if (token) {
      return req.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }
    return req;
  }











}
