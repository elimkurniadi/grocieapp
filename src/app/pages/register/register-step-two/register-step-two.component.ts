import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ModalPinLocationComponent } from '@shared/common/modal-pin-location/modal-pin-location.component';
import { ModalSettingComponent } from '@shared/common/modals/modal-setting/modal-setting.component';
import { ModalOtpComponent } from '@shared/common/otp/modal-otp/modal-otp.component';
import { Response, Setting } from '@shared/models';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { CacheService, GlobalService, RxValidatorService, ToastService } from '@shared/services';
import { AlertService } from '@shared/services/alert.service';
import { SettingService } from '@shared/services/modules';
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
  subDistrictList = [];
  isOnFetch = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private validatorSrv: RxValidatorService,
    private userSrv: UserService,
    private translateSrv: TranslateService,
    private gs: GlobalService,
    private modalCtrl: ModalController,
    private addressSrv: AddressService,
    private settingSrv: SettingService,
    private toastSrv: ToastService,
    private cache: CacheService
  ) {
    this.observeQueryParams();
    this.initRegisterFormStepTwo();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.observeFetchState();
  }

  observeFetchState() {
    this.gs.observeOnFetch().subscribe((value: boolean) => {
      this.isOnFetch = value;
    });
  }

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
      latitude: [null, [RxwebValidators.required(), RxwebValidators.latitude()]],
      longitude: [null, [RxwebValidators.required(), RxwebValidators.longitude()]],
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
      sub_district_id: [{ value: null, disabled: true }, [RxwebValidators.required()]],
      address_name: [null, [RxwebValidators.required()]],
      tos: [false, RxwebValidators.requiredTrue()],
      token: [this.cache.googleUserInfo?.authentication?.idToken || this.cache.fbToken],
    });
    this.countCurrentChar();
    this.fetchProvinces();
  }

  register() {
    if (this.fg.valid) {
      const value = this.combineFormValues();
      let platform = null;
      if (this.cache.googleUserInfo) {
        platform = '/google';
      } else if (this.cache.fbToken) {
        platform = '/facebook';
      }

      this.userSrv.register(value, platform).then(() => {
        this.cache.clearSocialInfo();
        this.router.navigate(['/tabs', 'home']);
        // this.showModalOtp();
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

  async fetchSubDistricts(districtId) {
    await this.addressSrv.getSubDistricts(districtId).then((res) => {
      this.subDistrictList = res;
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

  onDistrictSelect(event) {
    const controls = this.fg.controls;
    if (event) {
      controls.sub_district_id.setValue(null);
      controls.sub_district_id.enable();
      this.fetchSubDistricts(event);
    }
  }

  async presentModalPinLocation() {
    const modal = await this.modalCtrl.create({
      component: ModalPinLocationComponent,
      componentProps: {
        longitude: this.fg.value.longitude,
        latitude: this.fg.value.latitude,
      },
    });

    modal.onDidDismiss().then((res) => {
      const data = res.data;
      if (data) {
        const controls = this.fg.controls;
        controls.longitude.setValue(data.coordinate.longitude);
        controls.latitude.setValue(data.coordinate.latitude);
        controls.address.setValue(data?.addressData?.formatted_address);
        controls.longitude.markAsDirty();
        controls.latitude.markAsDirty();
        controls.address.markAsDirty();
      }
    });

    return await modal.present();
  }

  showTnc() {
    this.settingSrv
      .getTnc()
      .then((res: Response) => {
        const data = res.response as Setting;
        data.name = this.translateSrv.get('TERMS_CONDITIONS');
        this.showSettingModal(data);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  async showSettingModal(data: Setting) {
    const modal = await this.modalCtrl.create({
      component: ModalSettingComponent,
      componentProps: {
        title: data.name,
        content: data.content,
      },
    });

    return await modal.present();
  }
}
