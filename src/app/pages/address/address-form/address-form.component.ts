import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService, RxValidatorService } from '@shared/services';
import { AddressService } from '@shared/services/modules/address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  fg: FormGroup;
  addressData = null;
  currentChar = null;
  provinceList: any[] = null;
  cityList: any[] = null;
  districtList: any[] = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private validatorSrv: RxValidatorService,
    private fb: FormBuilder,
    private translateSrv: TranslateService,
    private gs: GlobalService,
    private addressSrv: AddressService
  ) {
    this.observerParam();
  }

  ngOnInit() {}

  observerParam() {
    this.activatedRoute.params.subscribe((param) => {
      const id = +param?.id;
      if (id) {
        // FETCH ADDRESS DETAIL AND PASS TO INIT FORM ARGUMENT
      } else {
        // INIT FORM WITHOUT ARGUMENT
      }

      this.initAddressForm();
    });
  }

  initAddressForm(data = null) {
    this.validatorSrv.validatorErrorMessage();
    this.fg = this.fb.group({
      latitude: [data?.latitude, [RxwebValidators.required(), RxwebValidators.latitude()]],
      longitude: [data?.longitude, [RxwebValidators.required(), RxwebValidators.longitude()]],
      address: [
        data?.address,
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 8, message: `${this.translateSrv.get('VALIDATOR_MIN')} 8` }),
          RxwebValidators.maxLength({ value: 100, message: `${this.translateSrv.get('VALIDATOR_MAX')} 100` }),
        ],
      ],
      province_id: [data?.province_id, [RxwebValidators.required()]],
      city_id: [{ value: null, disabled: true }, [RxwebValidators.required()]],
      district_id: [{ value: null, disabled: true }, [RxwebValidators.required()]],
      postal_code: [data?.postal_code, [RxwebValidators.required(), RxwebValidators.numeric()]],
      address_name: [data?.address_name, [RxwebValidators.required()]],
    });

    data ? this.initAreaList(data?.province_id, data?.city_id, data?.district_id) : this.fetchProvinces();
  }

  submit() {
    if (this.fg.valid) {
    }
  }

  countCurrentChate() {
    const subscription = this.fg.controls.address.valueChanges;
    subscription.subscribe((res) => {
      this.currentChar = this.gs.countChar(res);
    });
  }

  initAreaList(idProvince, idCity, idDistrict) {
    const controls = this.fg.controls;
    this.fetchProvinces();
    controls.province_id.setValue(idProvince);
    this.fetchCities(idProvince);
    controls.city_id.setValue(idCity);
    controls.city_id.enable();
    this.fetchDistricts(idCity);
    controls.district_id.setValue(idDistrict);
    controls.district_id.enable();
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
