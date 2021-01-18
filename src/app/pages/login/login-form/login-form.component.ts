import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService, GlobalService, RxValidatorService } from '@shared/services';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  fg: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authSrv: AuthService,
    private validatorSrv: RxValidatorService,
    private gs: GlobalService,
    private toastSrv: ToastService
  ) {
    this.buildLoginForm();
  }

  ngOnInit() {}

  buildLoginForm() {
    this.validatorSrv.validatorErrorMessage();

    this.fg = this.fb.group({
      email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
      password: [null, [RxwebValidators.required()]],
    });
  }

  login() {
    if (this.fg.valid) {
      this.authSrv
        .login(this.fg.value)
        .then(() => {
          this.router.navigate(['/tabs', 'home']);
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
