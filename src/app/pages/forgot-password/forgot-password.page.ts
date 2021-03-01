import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService, RxValidatorService, ToastService } from '@shared/services';
import { UserService } from '@shared/services/modules';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  fg: FormGroup;

  constructor(
    private validatorSrv: RxValidatorService,
    private userSrv: UserService,
    private fb: FormBuilder,
    private toastSrv: ToastService,
    private translate: TranslateService,
    private gs: GlobalService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  buildForm() {
    this.validatorSrv.validatorErrorMessage();

    this.fg = this.fb.group({
      email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
    });
  }

  requestPassword() {
    if (this.fg.valid) {
      this.userSrv
        .forgotPassword(this.fg.value)
        .then(() => {
          const msg = this.translate.get('CHECK_EMAIL');
          this.toastSrv.show(msg);
        })
        .catch((err) => {
          const error = err.error.error;
          this.toastSrv.show(error.message);
        });
    } else {
      this.gs.markDirtyForm(this.fg);
    }
  }
}
