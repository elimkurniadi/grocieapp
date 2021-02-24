import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ModalPinLocationComponent } from '@shared/common/modal-pin-location/modal-pin-location.component';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService, RxValidatorService } from '@shared/services';
import { AlertService } from '@shared/services/alert.service';
import { AddressService } from '@shared/services/modules/address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  fg: FormGroup;
  addressData = null;
  currentChar = 0;
  provinceList: any[] = null;
  cityList: any[] = null;
  districtList: any[] = null;
  addressId: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private validatorSrv: RxValidatorService,
    private fb: FormBuilder,
    private translateSrv: TranslateService,
    private gs: GlobalService,
    private addressSrv: AddressService,
    private navCtrl: NavController,
    private alertSrv: AlertService,
    private modalCtrl: ModalController
  ) {
    this.observerParam();
    this.fetchProvinces();
  }

  ngOnInit() {}

  observerParam() {
    this.activatedRoute.params.subscribe((param) => {
      const id = +param?.id;
      this.addressId = id;
      this.addressId ? this.fetchAddressDetail(this.addressId) : this.initAddressForm();
    });
  }

  fetchAddressDetail(id) {
    this.addressSrv.getAddress(id).then((res) => {
      this.addressData = res;
      this.initAddressForm(this.addressData);
    });
  }

  initAddressForm(data = null) {
    this.validatorSrv.validatorErrorMessage();
    this.fg = this.fb.group({
      receiver_name: [data?.receiver_name ? data?.receiver_name : null, RxwebValidators.required()],
      phone: [
        data?.phone ? data?.phone : null,
        [
          RxwebValidators.required(),
          RxwebValidators.numeric(),
          RxwebValidators.minLength({ value: 7, message: `${this.translateSrv.get('VALIDATOR_MIN')} 7` }),
          RxwebValidators.maxLength({ value: 15, message: `${this.translateSrv.get('VALIDATOR_MAX')} 15` }),
        ],
      ],
      latitude: [data?.latitude, [RxwebValidators.required(), RxwebValidators.latitude()]],
      longitude: [data?.longitude, [RxwebValidators.required(), RxwebValidators.longitude()]],
      address: [data?.address ? data?.address : '-', [RxwebValidators.required()]],
      address_detail: [
        data?.address_detail ? data?.address_detail : null,
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 8, message: `${this.translateSrv.get('VALIDATOR_MIN')} 8` }),
          RxwebValidators.maxLength({ value: 100, message: `${this.translateSrv.get('VALIDATOR_MAX')} 100` }),
        ],
      ],
      province_id: [data?.province?.province_id, [RxwebValidators.required()]],
      city_id: [{ value: null, disabled: true }, [RxwebValidators.required()]],
      district_id: [{ value: null, disabled: true }, [RxwebValidators.required()]],
      postal_code: [data?.postal_code, [RxwebValidators.required(), RxwebValidators.numeric()]],
      address_name: [data?.address_name, [RxwebValidators.required()]],
    });

    this.countCurrentChar();
    if (data) {
      setTimeout(() => {
        this.initAreaList(data?.province?.province_id, data?.city?.city_id, data?.district?.district_id);
      }, 1000);
    }
  }

  submit() {
    if (this.fg.valid) {
      this.addressId ? this.updateAddress(this.fg, this.addressId) : this.addAddress(this.fg.value);
    }
  }

  addAddress(data) {
    this.addressSrv.createAddress(data).then(() => {
      this.navCtrl.back();
    });
  }

  updateAddress(data, id) {
    const dirtyValue = this.gs.getChangedFormProperties(data);
    this.addressSrv.putAddress(dirtyValue, id).then(() => {
      this.navCtrl.back();
    });
  }

  countCurrentChar() {
    const subscription = this.fg.controls.address_detail.valueChanges;
    subscription.subscribe((res) => {
      this.currentChar = this.gs.countChar(res);
    });
  }

  initAreaList(idProvince, idCity, idDistrict) {
    const controls = this.fg.controls;
    controls.province_id.setValue(idProvince);
    this.fg.updateValueAndValidity();
    this.fetchCities(idProvince)
      .then(() => {
        controls.city_id.setValue(idCity);
        controls.city_id.enable();
        this.fg.updateValueAndValidity();
      })
      .then(() => {
        this.fetchDistricts(idCity).then(() => {
          controls.district_id.setValue(idDistrict);
          controls.district_id.enable();
          this.fg.updateValueAndValidity();
        });
      });
  }

  async fetchProvinces() {
    await this.addressSrv.getProvinces().then((res) => {
      this.provinceList = res;
    });
  }

  async fetchCities(provinceId) {
    await this.addressSrv.getCities(provinceId).then((res) => {
      this.cityList = res;
    });
  }

  async fetchDistricts(cityId) {
    await this.addressSrv.getDistricts(cityId).then((res) => {
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

  confirmDeleteAddress() {
    this.alertSrv.presentAlert({
      message: `${this.translateSrv.get('DELETE_ADDRESS_CONFIRM')}`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.deleteAddress();
          },
        },
        {
          text: `${this.translateSrv.get('CANCEL')}`,
          role: 'cancel',
        },
      ],
    });
  }

  deleteAddress() {
    this.addressSrv.deleteAddress(this.addressId).then(() => {
      this.navCtrl.back();
    });
  }

  async presentModalPinLocation() {
    const modal = await this.modalCtrl.create({
      component: ModalPinLocationComponent,
      componentProps: {
        longitude: this.fg.value.longitude,
        latitude: this.fg.value.latitude,
      },
    });

    modal.onWillDismiss().then((res) => {
      const data = res.data;
      if (data) {
        const controls = this.fg.controls;
        controls.longitude.setValue(data.longitude);
        controls.latitude.setValue(data.latitude);
        controls.longitude.markAsDirty();
        controls.latitude.markAsDirty();
      }
    });

    return await modal.present();
  }
}
