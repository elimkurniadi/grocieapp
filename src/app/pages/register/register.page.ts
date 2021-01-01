import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { RxValidatorService } from '@shared/services';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  fg: FormGroup;
  currDate = moment(new Date()).format('YYYY-MM-DD');
  constructor(private fb: FormBuilder, private router: Router, private validatorSrv: RxValidatorService) {}

  ngOnInit() {
    this.initRegisterFormStepOne();
  }

  ngOnDestroy() {}

  initRegisterFormStepOne() {
    this.validatorSrv.validatorErrorMessage();
    this.fg = this.fb.group({
      name: ['someone', [RxwebValidators.required()]],
      email: ['someone@placeholder.com', [RxwebValidators.required(), RxwebValidators.email()]],
      phone_number: ['081388355324', [RxwebValidators.required(), RxwebValidators.numeric()]],
      gender: ['m', [RxwebValidators.required()]],
      birthdate: [this.currDate, [RxwebValidators.required()]],
      password: ['qwe123', [RxwebValidators.required()]],
      confirm_password: ['qwe123', [RxwebValidators.required()]],
    });
  }

  next() {
    if (this.fg.valid) {
      this.router.navigate(['/register/step-two'], { queryParams: { prefix: JSON.stringify(this.fg.value) } });
    }
  }
}
