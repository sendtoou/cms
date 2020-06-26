import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CaseComponent } from 'src/app/pages/user/case/case.component';
import { SuggestComponent } from 'src/app/pages/user/suggest/suggest.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { OverviewComponent } from 'src/app/pages/user/overview/overview.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    UserComponent,
    OverviewComponent,
    CaseComponent,
    SuggestComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule
  ]
})
export class UserModule { }
