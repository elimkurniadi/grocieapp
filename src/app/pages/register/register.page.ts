import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@shared/pipes/translate/translate.service';
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validatorSrv: RxValidatorService,
    private translateSrv: TranslateService
  ) {
    this.initRegisterFormStepOne();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  initRegisterFormStepOne() {
    this.validatorSrv.validatorErrorMessage();
    this.fg = this.fb.group({
      full_name: [null, [RxwebValidators.required()]],
      email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
      phone: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.numeric(),
          RxwebValidators.minLength({ value: 7, message: `${this.translateSrv.get('VALIDATOR_MIN')} 7` }),
          RxwebValidators.maxLength({ value: 15, message: `${this.translateSrv.get('VALIDATOR_MAX')} 15` }),
        ],
      ],
      gender: ['m', [RxwebValidators.required()]],
      birth_date: [this.currDate, [RxwebValidators.required()]],
      password: [null, [RxwebValidators.required()]],
      confirm_password: [null, [RxwebValidators.required(), RxwebValidators.compare({ fieldName: 'password' })]],
    });
  }

  next() {
    if (this.fg.valid) {
      this.router.navigate(['/register/step-two'], { queryParams: { prefix: JSON.stringify(this.fg.value) } });
    }
  }
}
