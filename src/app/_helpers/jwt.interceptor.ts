import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../_services/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =  this.tokenService.getAccessToken();
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
