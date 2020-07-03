import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-pwd-change',
  templateUrl: './pwd-change.component.html',
  styleUrls: ['./pwd-change.component.scss']
})
export class PwdChangeComponent implements OnInit {
  pwdChageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.pwdChageForm = this.formBuilder.group({
    //   oldPwd: ['', Validators.required, OldPwdValidators.shouldBe1234],
    //   newPwd: ['', Validators.required],
    //   confirmPwd: ['', Validators.required]
    // }, { validator: OldPwdValidators.matchPwds });
  }

  get oldPwd(){
    return this.pwdChageForm.get('oldPwd');
  }

   get newPwd(){
    return this.pwdChageForm.get('newPwd');
  }

   get confirmPwd(){
    return this.pwdChageForm.get('confirmPwd');
  }

}
