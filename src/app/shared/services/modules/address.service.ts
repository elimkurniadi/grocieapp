import { Injectable } from '@angular/core';
import { GlobalService } from '..';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getAddressList(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('address');
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          resolve(res?.response?.rows);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getProvinces(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('address/province');
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          resolve(res.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getCities(provinceId): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`address/city/${provinceId}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          resolve(res.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getDistricts(cityId): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`address/district/${cityId}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          resolve(res.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
