import { Injectable } from '@angular/core';
import { Response } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getTnc(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('setting/terms_condition');
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
  getPrivacyPolicy(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('setting/privacy_policy');
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