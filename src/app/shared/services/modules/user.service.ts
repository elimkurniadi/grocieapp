import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService, private gs: GlobalService, private authSrv: AuthService) {}

  register(data): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('profile/register', data);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          if (res.code === 201) {
            this.authSrv.loginByToken(res.response);
            resolve(res);
          } else {
            reject('!201');
          }
        },
        () => {
          reject('!201');
        }
      );
    });
  }

  getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('profile');
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          res.code === 200 ? resolve(res) : reject('!200');
        },
        () => {
          reject('!200');
        }
      );
    });
  }

  checkEmailPhoneAvailability(emailData, phoneData): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = {
        email: emailData,
        phone: phoneData,
      };
      const subscription = this.api.getData('profile/check_duplicate', null, null, data);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          res.code === 200 ? resolve(true) : reject(false);
        },
        () => {
          reject(false);
        }
      );
    });
  }
}
