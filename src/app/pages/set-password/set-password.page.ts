import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ModalInfoComponent } from '@shared/common/modals/modal-info/modal-info.component';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { AuthService, GlobalService, RxValidatorService, ToastService } from '@shared/services';
import { UserService } from '@shared/services/modules';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage implements OnInit {
  fg: FormGroup;
  showCurrPass = false;
  showNewPass = false;

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private gs: GlobalService,
    private router: Router,
    private fb: FormBuilder,
    private validatorSrv: RxValidatorService,
    private userSrv: UserService,
    private route: ActivatedRoute,
    private toastSrv: ToastService,
    private authSrv: AuthService,
    private navCtrl: NavController
  ) {
    this.buildForm();
    this.route.params.subscribe((param) => {
      this.checkForgotToken(param.token);
    });
  }

  ngOnInit() {}

  checkForgotToken(token: string) {
    this.authSrv
      .checkForgotToken(token)
      .then((res) => {
        if (res) {
          this.fg.patchValue({ token });
        } else {
          const msg = this.translate.get('INVALID_TOKEN');
          this.toastSrv.show(msg);
          this.navigateToLogin();
        }
      })
      .catch((err) => {
        const message = this.gs.getErrorMessage(err);
        this.toastSrv.show(message);
      });
  }

  buildForm() {
    this.validatorSrv.validatorErrorMessage();

    this.fg = this.fb.group({
      password: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 5, message: `${this.translate.get('VALIDATOR_MIN')} 5` }),
        ],
      ],
      confirm_password: [null, [RxwebValidators.required(), RxwebValidators.compare({ fieldName: 'password' })]],
      token: null,
    });
  }

  setPassword() {
    if (this.fg.valid) {
      this.userSrv
        .setPassword(this.fg.value)
        .then(() => {
          this.presentSuccessModal();
        })
        .catch((err) => {
          const message = this.gs.getErrorMessage(err);
          this.toastSrv.show(message);
        });
    } else {
      this.gs.markDirtyForm(this.fg);
    }
  }

  async presentSuccessModal() {
    const modal = await this.modalCtrl.create({
      component: ModalInfoComponent,
      cssClass: 'modal-info',
      componentProps: {
        title: this.translate.get('CHANGE_PASSWORD_SUCCESS_TITLE'),
        message: this.translate.get('CHANGE_PASSWORD_SUCCESS_MESSAGE'),
        btnText: this.translate.get('LOGIN'),
      },
    });

    modal.onDidDismiss().then(() => {
      this.navigateToLogin();
    });

    return await modal.present();
  }

  navigateToLogin() {
    this.navCtrl.navigateRoot(['/login']);
  }
}
