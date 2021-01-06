import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService, RxValidatorService } from '@shared/services';
import { UserService } from '@shared/services/modules/user.service';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.scss'],
})
export class RegisterStepTwoComponent implements OnInit {
  prefixFormValue: any = null;
  fg: FormGroup;
  currentChar = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private validatorSrv: RxValidatorService,
    private userSrv: UserService,
    private translateSrv: TranslateService,
    private gs: GlobalService
  ) {
    this.observeQueryParams();
    this.initRegisterFormStepTwo();
  }

  ngOnInit() {}

  observeQueryParams() {
    const prefix = this.activatedRoute.snapshot.queryParamMap.get('prefix');
    prefix ? (this.prefixFormValue = JSON.parse(prefix)) : this.router.navigate(['/registers']);
  }

  initRegisterFormStepTwo() {
    this.validatorSrv.validatorErrorMessage();
    this.fg = this.fb.group({
      delivery_address: [null, [RxwebValidators.required()]],
      delivery_address_detail: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 8, message: `${this.translateSrv.get('VALIDATOR_MIN')} 8` }),
          RxwebValidators.maxLength({ value: 100, message: `${this.translateSrv.get('VALIDATOR_MAX')} 100` }),
        ],
      ],
      province: [null, [RxwebValidators.required()]],
      city: [null, [RxwebValidators.required()]],
      district: [null, [RxwebValidators.required()]],
      postal_code: [null, [RxwebValidators.required(), RxwebValidators.numeric()]],
      address_name: [null, [RxwebValidators.required()]],
      tos: [false, RxwebValidators.requiredTrue()],
    });
    this.countCurrentChar();
  }

  register() {
    if (this.fg.valid) {
      const value = this.combineFormValues();
      this.userSrv.register(value).then(() => {
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      });
      this.router.navigate(['/']);
    }
  }

  combineFormValues() {
    const valueOne = this.prefixFormValue;
    const valueTwo = this.fg.value;
    const finalValue = { ...valueOne, ...valueTwo };
    return finalValue;
  }

  countCurrentChar() {
    const subscription = this.fg.controls.delivery_address_detail.valueChanges;
    this.gs.pushSubscription(subscription);
    subscription.subscribe((res) => {
      this.currentChar = this.gs.countChar(res);
    });
  }
}
