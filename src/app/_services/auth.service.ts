import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { apiUrl } from '../url.constant';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogin = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  // getToken(): string {
  //   return localStorage.getItem('x-access-token');
  // }

  // setToken(token: string): void {
  //   localStorage.setItem('x-access-token', token);
  // }

  // getTokenExpirationDate(token: string): Date {
  //   const decoded = decode(token);

  //   if (decoded.exp === undefined) { return null; }

  //   const date = new Date(0);
  //   date.setUTCSeconds(decoded.exp);
  //   return date;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if (!token) { token = this.getToken(); }
  //   if (!token) { return true; }

  //   const date = this.getTokenExpirationDate(token);
  //   if (date === undefined) { return false; }
  //   return !(date.valueOf() > new Date().valueOf());
  // }


  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('x-access-token');
    // const helper = new JwtHelperService();
    // const isExpired = helper.isTokenExpired(refToken);
    // if (refToken && !isExpired) {
    //     return true;
    // }
  // }

  // ensureAuthenticated() {
  //   return this.http.get<any>(apiUrl.ensure)
  //   .pipe(
  //     tap(res => {
  //       console.log('ensure:', res);
  //       this.isLogin = true;
  //     })
  //   );
  // }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('x-access-token');
    // return !!this.jwtHelper.isTokenExpired(token);
    // check expire token for prevent fake token
    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (token && !isExpired) {
        return true;
    }
  }

  isRolesAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles if empty, authorize the user to access the page that not role
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }
    const token = localStorage.getItem('x-access-token');
    const decodeToken = decode(token);
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    const role = 'role';
    const roleToken =  decodeToken[role];
    const roleGuard = allowedRoles;
    const isInclude = roleToken.some((hasRole: any) => roleGuard.includes(hasRole));
    return isInclude;
  }

  login(loginValue: any) {
    return this.http.post<any>(apiUrl.login, loginValue, {observe: 'response'})
    .pipe(
      shareReplay(),
      tap(res => {
        this.setSessionToken(res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.router.navigate(['/home']);
      })
    );
  }

  register(registerValue: any) {
    return this.http.post<any>(apiUrl.register, registerValue, {observe: 'response'})
    .pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSessionToken(res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.router.navigate(['/home']);
      })
    );
  }

  getNewAccessToken() {
    return this.http.get<any>(apiUrl.token, {headers: {'x-refresh-token': this.getRefreshToken()}, observe: 'response'})
      .pipe(
        tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    );
  }

  logout() {
    this.removeSessionToken();
    this.router.navigate(['/landing']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  setAccessToken(token: string) {
    localStorage.setItem('x-access-token', token);
  }

  private setSessionToken(token: string, refreshToken: string) {
    localStorage.setItem('x-access-token', token);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSessionToken() {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
}
