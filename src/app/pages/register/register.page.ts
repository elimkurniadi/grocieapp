import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { RxValidatorService } from '@shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  fg: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private validatorSrv: RxValidatorService) {
    this.initRegisterFormStepOne();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  initRegisterFormStepOne() {
    this.validatorSrv.validatorErrorMessage();
    this.fg = this.fb.group({
      name: [null, [RxwebValidators.required()]],
      email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
      phone_number: [null, [RxwebValidators.required(), RxwebValidators.numeric()]],
      gender: [null, [RxwebValidators.required()]],
      birthdate: [null, [RxwebValidators.required()]],
      password: [null, [RxwebValidators.required()]],
      confirm_password: [null, [RxwebValidators.required()]],
    });
  }

  next() {
    if (this.fg.valid) {
      this.router.navigate(['/register/step-two'], { queryParams: { prefix: JSON.stringify(this.fg.value) } });
    }
  }
}
