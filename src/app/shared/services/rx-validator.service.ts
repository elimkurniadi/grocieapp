import { Injectable } from '@angular/core';
import { ErrorMessageBindingStrategy, ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Injectable({
  providedIn: 'root',
})
export class RxValidatorService {
  constructor() {
    this.validatorErrorMessage();
  }

  validatorErrorMessage() {
    return ReactiveFormConfig.set({
      validationMessage: {
        required: 'This field is required',
        alpha: 'Only alphabet are allowed',
        alphaNumeric: 'Only alphanumeric are allowed',
        numeric: 'Only numeric are allowed',
        url: 'Only URL are allowed (www.example.com)',
        email: 'Please input correct email format (ex: someone@example.com)',
        phonenumber: 'Please input correct phone number format (ex: 08123456789)',
      },
      reactiveForm: {
        errorMessageBindingStrategy: ErrorMessageBindingStrategy.OnDirtyOrTouched,
      },
    });
  }
}
