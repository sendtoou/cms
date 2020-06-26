import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    // redirect to home if already logged in
    // if (this.authService.login) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }


  onSubmit(value: any) {
    this.loading = true;
    this.authService.login(value)
    .subscribe(
      success => {
        console.log('res:', success);
        // this.router.navigate(['']);
        const token = success.token;
        const decodeToken = decode(token);
        if (!decodeToken) {
          console.log('Invalid token');
          this.router.navigate(['/accessdenied']);
        }
        const roleToken = decodeToken['role'];
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
          this.router.navigate(['']);
        }

      }, error => {
        console.log('resError:', error);
        // this.errorMessage = error.error.message;
        this.errorMessage = error;
        this.loading = false;
      });
  }
}
