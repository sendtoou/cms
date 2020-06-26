import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  // canActivate(next: ActivatedRouteSnapshot): boolean {
  //   // this will be passed from the route config
  //   // on the data property
  //   const expectedRole = next.data.expectedRole;
  //   const token = localStorage.getItem('token');
  //   // decode the token to get its payload
  //   const tokenPayload = decode(token);
  //   if (
  //     !this.authService.isAuthenticated() ||
  //     tokenPayload.role !== expectedRole
  //   ) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // const allowedRoles = next.data.allowedRoles;
      // const token = localStorage.getItem('token');
      // const tokenPayload = decode(token);
      // if (tokenPayload.role !== allowedRoles) {
      //   this.router.navigate(['login']);
      //   return false;
      // } else {
      //   return true;
      // }
      const allowedRoles = next.data.allowedRoles;
      const hasRole = this.authService.isRolesAuthorized(allowedRoles);
      if (!hasRole) {
        this.router.navigate(['/accessdenied']);
      }
      return hasRole;
  }

  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   const allowedRoles = next.data.allowedRoles;
  //   const isAuthorized = this.authService.isRolesAuthorized(allowedRoles);
  //   if (!isAuthorized) {
  //     // if not authorized, show access denied message
  //     this.router.navigate(['/roleaccessdenied']);
  //   }
  //   return isAuthorized;
  // }
}
