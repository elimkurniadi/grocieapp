import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
  isOnFetch = false;
  showPass = false;
  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authSrv: AuthService,
    private validatorSrv: RxValidatorService,
    private gs: GlobalService,
    private toastSrv: ToastService
  ) {
    this.buildLoginForm();
  }

  ionViewDidEnter() {
    this.observeFetchState();
  }

  ngOnInit() {}

  observeFetchState() {
    this.gs.observeOnFetch().subscribe((value: boolean) => {
      this.isOnFetch = value;
    });
  }

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
          this.navCtrl.navigateRoot(['/tabs', 'home']);
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
