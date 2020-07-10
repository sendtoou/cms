import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pwd-reset',
  templateUrl: './pwd-reset.component.html',
  styleUrls: ['./pwd-reset.component.scss']
})
export class PwdResetComponent implements OnInit {
  pwdResetForm: FormGroup;
  errorMessage: string;
  isResetFormValid = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    //  this.pwdResetForm = this.formBuilder.group({
    //   oldPwd: ['', Validators.required, OldPwdValidators.shouldBe1234],
    //   newPwd: ['', Validators.required],
    //   confirmPwd: ['', Validators.required]
    // }, { validator: OldPwdValidators.matchPwds });
  }

}
