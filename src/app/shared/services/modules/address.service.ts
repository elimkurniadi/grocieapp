import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getProvinces(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('address/province');
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          res.code === 200 ? resolve(res.response) : reject('!200');
        },
        () => {
          reject('!200');
        }
      );
    });
  }

  getCities(provinceId): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('address/city', null, null, { province_id: provinceId });
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          res.code === 200 ? resolve(res.response) : reject('!200');
        },
        () => {
          reject('!200');
        }
      );
    });
  }

  getDistricts(cityId): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('address/district', null, null, { city_id: cityId });
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          res.code === 200 ? resolve(res.response) : reject('!200');
        },
        () => {
          reject('!200');
        }
      );
    });
  }
}
