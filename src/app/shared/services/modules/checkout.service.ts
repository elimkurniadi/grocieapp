import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  calculatePrice(filter?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('checkout/calculate_price', null, null, filter);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
