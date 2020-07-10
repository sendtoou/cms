import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models/user';
import { AuthService } from '../../_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  user: User;
  userId: '';

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userId = this.authService.getUserId();

    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
    });
  }

}
