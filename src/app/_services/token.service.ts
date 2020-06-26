import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  // public saveToken(token: string) {
  //   window.sessionStorage.removeItem(TOKEN_KEY);
  //   window.sessionStorage.setItem(TOKEN_KEY, token);
  // }

  // public getToken(): string {
  //   return sessionStorage.getItem(TOKEN_KEY);
  // }

  // public saveUser(user) {
  //   window.sessionStorage.removeItem(USER_KEY);
  //   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  // }

  // public getUser() {
  //   return JSON.parse(sessionStorage.getItem(USER_KEY));
  // }
}
