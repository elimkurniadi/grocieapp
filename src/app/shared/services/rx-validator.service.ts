import { Injectable } from '@angular/core';
import { ErrorMessageBindingStrategy, ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@shared/pipes/translate/translate.service';

@Injectable({
  providedIn: 'root',
})
export class RxValidatorService {
  constructor(private translateSrv: TranslateService) {
    this.validatorErrorMessage();
  }

  validatorErrorMessage() {
    return ReactiveFormConfig.set({
      validationMessage: {
        required: this.translateSrv.get('VALIDATOR_REQUIRED'),
        alpha: this.translateSrv.get('VALIDATOR_ALPHA'),
        alphaNumeric: this.translateSrv.get('VALIDATOR_ALPHANUM'),
        numeric: this.translateSrv.get('VALIDATOR_NUM'),
        url: this.translateSrv.get('VALIDATOR_URL'),
        email: this.translateSrv.get('VALIDATOR_EMAIL'),
        phonenumber: this.translateSrv.get('VALIDATOR_PHONE'),
        compare: this.translateSrv.get('VALIDATOR_PASSWORD_COMPARE'),
      },
      reactiveForm: {
        errorMessageBindingStrategy: ErrorMessageBindingStrategy.OnDirty,
      },
    });
  }
}
