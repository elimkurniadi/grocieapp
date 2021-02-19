import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  add(body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('transaction', body);
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
