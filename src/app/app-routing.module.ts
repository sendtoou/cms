import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'accessdenied', component: AccessDeniedComponent },
  { path: 'pagenotfound', component: PageNotFoundComponent },
  {
    path: 'admin',
    loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['admin', 'manager'] }
  },
  { path: 'user',
    loadChildren: () => import('./layouts/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard, RoleGuard],
    // canActivateChild: [RoleGuard],
    data: { allowedRoles: ['user', 'member'] }
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
