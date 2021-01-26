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
          this.authSrv.loginByToken(res.response);
          resolve(res);
        },
        (err) => {
          reject(err);
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
          resolve(res?.response);
        },
        (err) => {
          reject(err);
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

  verifyEmail(otp): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = {
        token: otp,
      };
      const subscription = this.api.postData('authentication/verify_email', data);
      subscription.subscribe(
        (res: any) => {
          res.code === 200 && res.response ? resolve(true) : reject(false);
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateProfile(data): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData('profile', data);
      subscription.subscribe(
        (res: any) => {
          res.code === 200 ? resolve(true) : reject(false);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
