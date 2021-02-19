import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { RxValidatorService } from '@shared/services';

@Component({
  selector: 'app-payment-cod',
  templateUrl: './payment-cod.component.html',
  styleUrls: ['./payment-cod.component.scss'],
})
export class PaymentCodComponent implements OnInit {
  fg: FormGroup;

  constructor(private validatorSrv: RxValidatorService, private fb: FormBuilder) {}

  ngOnInit() {
    this.buildCodForm();
  }

  buildCodForm() {
    this.validatorSrv.validatorErrorMessage();

    this.fg = this.fb.group({
      amount: [null, [RxwebValidators.required()]],
    });
  }

  pay() {
    console.log('paid');
  }
}
