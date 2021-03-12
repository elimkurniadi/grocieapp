import { Injectable } from '@angular/core';
import { Response } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getTnc(lang?): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('setting/terms_condition' + lang);
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
  getPrivacyPolicy(lang?): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('setting/privacy_policy' + lang);
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

  getShareApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('setting/share_text');
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: Response) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getFAQ(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('faq');
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

  getDeliveryTime(filter?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('setting/delivery_time', null, null, filter);
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

  checkMaintenance(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('setting/maintenance');
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

  checkAppVersion(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('setting/app_version');
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

  checkOperationalTime(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('setting/operational_time');
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
