import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Page, ResponsePagination, Sort } from '@shared/models';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private api: ApiService, private gs: GlobalService) {

  }

  getNotificationList(pagination?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`notification/system`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getInboxList(pagination?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`notification/inbox`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

}
