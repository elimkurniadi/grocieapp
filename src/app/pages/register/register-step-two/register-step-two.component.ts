import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ModalOtpComponent } from '@shared/common/otp/modal-otp/modal-otp.component';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService, RxValidatorService } from '@shared/services';
import { AlertService } from '@shared/services/alert.service';
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
    private gs: GlobalService,
    private alertSrv: AlertService,
    private modalCtrl: ModalController
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
      latitude: ['-6.598574', [RxwebValidators.required(), RxwebValidators.latitude()]],
      longitude: ['106.807496', [RxwebValidators.required(), RxwebValidators.longitude()]],
      address: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 8, message: `${this.translateSrv.get('VALIDATOR_MIN')} 8` }),
          RxwebValidators.maxLength({ value: 100, message: `${this.translateSrv.get('VALIDATOR_MAX')} 100` }),
        ],
      ],
      provinsi_id: [null, [RxwebValidators.required()]],
      kabupaten_id: [{ value: null, disabled: true }, [RxwebValidators.required()]],
      kecamatan_id: [{ value: null, disabled: true }, [RxwebValidators.required()]],
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
        this.showAlertVerifyEmail();
      });
    }
  }

  combineFormValues() {
    const valueOne = this.prefixFormValue;
    const valueTwo = this.fg.value;
    const finalValue = { ...valueOne, ...valueTwo };
    return finalValue;
  }

  countCurrentChar() {
    const subscription = this.fg.controls.address.valueChanges;
    this.gs.pushSubscription(subscription);
    subscription.subscribe((res) => {
      this.currentChar = this.gs.countChar(res);
    });
  }

  showAlertVerifyEmail() {
    this.alertSrv.presentAlert({
      header: `${this.translateSrv.get('VERIFY_EMAIL_HEADER')}`,
      message: `${this.translateSrv.get('VERIFY_EMAIL_BODY')}`,
      buttons: [
        {
          text: `${this.translateSrv.get('SKIP')}`,
          role: 'cancel',
        },
        {
          text: `${this.translateSrv.get('VERIFY')}`,
          handler: () => {
            this.showModalOtp();
          },
        },
      ],
    });
  }

  async showModalOtp() {
    const modal = await this.modalCtrl.create({
      component: ModalOtpComponent,
    });
    return await modal.present();
  }

  onProvinceSelect(event) {
    console.log('event: ', event);
    const controls = this.fg.controls;
    controls.kabupaten_id.setValue(null);
    controls.kabupaten_id.enable();
    controls.kecamatan_id.setValue(null);
    controls.kecamatan_id.disable();

    // FETCH CITY LIST
  }

  onCitySelect(event) {
    const controls = this.fg.controls;
    if (event) {
      controls.kecamatan_id.setValue(null);
      controls.kecamatan_id.enable();

      // FETCH DISTRICT LIST
    }
  }
}
