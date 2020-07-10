import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { HttpResponse } from '@angular/common/http';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private fromBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.fromBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(value: any) {
    this.loading = true;
    this.authService.register(value).subscribe((res: HttpResponse<any>) => {
      const token = res.body.token;
      const decodeToken = decode(token);
      if (!decodeToken) {
        console.log('Invalid token');
        this.router.navigate(['/accessdenied']);
      }
      const role = 'role';
      const roleToken = decodeToken[role];
      const isAdmin = roleToken.includes('admin');
      const isUser = roleToken.includes('user');
      const isManager = roleToken.includes('manager');
      if (isAdmin) {
        this.router.navigate(['/admin']);
      } else if (isUser) {
        this.router.navigate(['/user']);
      } else if (isManager) {
        this.router.navigate(['/manager']);
      } else {
        this.router.navigate(['/home']);
      }
    }, error => {
        console.log('resError:', error);
        // this.errorMessage = error.error.message;
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
