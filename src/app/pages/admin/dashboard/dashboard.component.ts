import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  user: User;
  userId: '';

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userId = this.authService.getUserId();
    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
    });
  }
}
