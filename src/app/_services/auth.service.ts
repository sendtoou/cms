import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { apiUrl } from '../url.constant';
import { TokenService } from './token.service';
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
    public jwtHelper: JwtHelperService,
    private tokenService: TokenService
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
    const roleoftoken =  decodeToken['role'];
    const roleofguard = allowedRoles;
    const isInclude = roleoftoken.some((hasRole: any) => roleofguard.includes(hasRole));
    return isInclude;
  }

  login(loginValue: any) {
    return this.http.post<any>(apiUrl.login, loginValue)
    .pipe(
      shareReplay(),
      tap(res => {
        localStorage.setItem('x-access-token', res.token);
      })
    );
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  private setSession(token: string) {
    // localStorage.setItem('id', userId);
    localStorage.setItem('x-access-token', token);
    // localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
}
