import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { RxValidatorService } from '@shared/services';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.scss'],
})
export class RegisterStepTwoComponent implements OnInit {
  prefixFormValue: any = null;
  fg: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private validatorSrv: RxValidatorService
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
      delivery_address: ['long lat!', [RxwebValidators.required()]],
      delivery_address_detail: ['deket post satpam', [RxwebValidators.required()]],
      province: ['1', [RxwebValidators.required()]],
      city: ['1', [RxwebValidators.required()]],
      district: ['1', [RxwebValidators.required()]],
      postal_code: ['1234', [RxwebValidators.required(), RxwebValidators.numeric()]],
      address_name: ['Alamat Rumah', [RxwebValidators.required()]],
      tos: [true, RxwebValidators.requiredTrue()],
    });
  }

  register() {
    if (this.fg.valid) {
      const value = this.combineFormValues();
      this.router.navigate(['/']);
    }
  }

  combineFormValues() {
    const valueOne = this.prefixFormValue;
    const valueTwo = this.fg.value;
    const finalValue = { ...valueOne, ...valueTwo };
    return finalValue;
  }
}
