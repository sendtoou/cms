import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =  this.authService.getAccessToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }
    // console.log('req.url', req.url);
    // console.log('req.headers', req.headers);
    // console.log('req.body', req.body);
    return next.handle(req);
  }
}
