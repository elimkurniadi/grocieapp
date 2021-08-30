import { Injectable } from '@angular/core';
import { Page, Sort } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getList(page?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('voucher', page, ordering);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: Response) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getListLoyalty(page?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('voucher/loyalty', page, ordering);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: Response) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getListByCode(code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`voucher/code/${code}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: Response) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getDetail(id?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`voucher/${id}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: Response) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  buyVoucher(id?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData(`voucher/buy/${id}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: Response) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
