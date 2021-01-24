import { Injectable } from '@angular/core';
import { ResponsePagination, Sort } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class BundlingService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getList(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('bundling');
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: ResponsePagination) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
