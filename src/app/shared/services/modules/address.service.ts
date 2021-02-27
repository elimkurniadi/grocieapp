import { Injectable } from '@angular/core';
import { GlobalService } from '..';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getAddress(id: number = null): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = id ? `address/${id}` : 'address?order_by=is_default&order_type=DESC';
      const subscription = this.api.getData(`${path}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          const response = id ? res?.response : res?.response?.rows;
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  createAddress(data): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('address', data);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          resolve(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  putAddress(data, id): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData(`address/${id}`, data);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          resolve(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deleteAddress(id): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.deleteData(`address/${id}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          resolve(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  setDefaultAddress(id): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData(`address/set_default/${id}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          resolve(res);
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

  getSubDistricts(districtId): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`address/sub_district/${districtId}`);
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
