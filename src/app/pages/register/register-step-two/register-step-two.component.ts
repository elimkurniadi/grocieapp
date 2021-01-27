import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ModalOtpComponent } from '@shared/common/otp/modal-otp/modal-otp.component';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService, RxValidatorService } from '@shared/services';
import { AlertService } from '@shared/services/alert.service';
import { AddressService } from '@shared/services/modules/address.service';
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
  provinceList = [];
  cityList = [];
  districtList = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private validatorSrv: RxValidatorService,
    private userSrv: UserService,
    private translateSrv: TranslateService,
    private gs: GlobalService,
    private alertSrv: AlertService,
    private modalCtrl: ModalController,
    private addressSrv: AddressService
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
      receiver_name: [this.prefixFormValue?.full_name, RxwebValidators.required()],
      phone: [
        this.prefixFormValue?.phone,
        [
          RxwebValidators.required(),
          RxwebValidators.numeric(),
          RxwebValidators.minLength({ value: 7, message: `${this.translateSrv.get('VALIDATOR_MIN')} 7` }),
          RxwebValidators.maxLength({ value: 15, message: `${this.translateSrv.get('VALIDATOR_MAX')} 15` }),
        ],
      ],
      latitude: ['-6.598574', [RxwebValidators.required(), RxwebValidators.latitude()]],
      longitude: ['106.807496', [RxwebValidators.required(), RxwebValidators.longitude()]],
      address: ['-', [RxwebValidators.required()]],
      address_detail: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 8, message: `${this.translateSrv.get('VALIDATOR_MIN')} 8` }),
          RxwebValidators.maxLength({ value: 100, message: `${this.translateSrv.get('VALIDATOR_MAX')} 100` }),
        ],
      ],
      province_id: [null, [RxwebValidators.required()]],
      city_id: [{ value: null, disabled: true }, [RxwebValidators.required()]],
      district_id: [{ value: null, disabled: true }, [RxwebValidators.required()]],
      postal_code: [null, [RxwebValidators.required(), RxwebValidators.numeric()]],
      address_name: [null, [RxwebValidators.required()]],
      tos: [false, RxwebValidators.requiredTrue()],
    });
    this.countCurrentChar();
    this.fetchProvinces();
  }

  register() {
    if (this.fg.valid) {
      const value = this.combineFormValues();
      this.userSrv.register(value).then(() => {
        this.showModalOtp();
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
    const subscription = this.fg.controls.address_detail.valueChanges;
    subscription.subscribe((res) => {
      this.currentChar = this.gs.countChar(res);
    });
  }

  async showModalOtp() {
    const modal = await this.modalCtrl.create({
      component: ModalOtpComponent,
    });
    return await modal.present();
  }

  fetchProvinces() {
    this.addressSrv.getProvinces().then((res) => {
      this.provinceList = res;
    });
  }

  fetchCities(provinceId) {
    this.addressSrv.getCities(provinceId).then((res) => {
      this.cityList = res;
    });
  }

  fetchDistricts(cityId) {
    this.addressSrv.getDistricts(cityId).then((res) => {
      this.districtList = res;
    });
  }

  onProvinceSelect(event) {
    const controls = this.fg.controls;
    controls.city_id.setValue(null);
    controls.city_id.enable();
    controls.district_id.setValue(null);
    controls.district_id.disable();
    this.fetchCities(event);
  }

  onCitySelect(event) {
    const controls = this.fg.controls;
    if (event) {
      controls.district_id.setValue(null);
      controls.district_id.enable();
      this.fetchDistricts(event);
    }
  }
}
