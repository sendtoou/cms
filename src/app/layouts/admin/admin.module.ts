import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from 'src/app/pages/admin/dashboard/dashboard.component';
import { TabComponent } from 'src/app/pages/admin/tab/tab.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    TabComponent,
    AdminMenuComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatIconModule
  ]
})
export class AdminModule { }
