import { Injectable } from '@angular/core';
import { Page, Sort } from '@shared/models';
import { AuthService } from '../auth.service';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService, private gs: GlobalService, private authSrv: AuthService) {}

  register(data, platform = null): Promise<any> {
    let path = 'profile/register';

    if (platform) {
      path += platform;
    }
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData(path, data);
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
      this.gs.pushSubscription(subscription);
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

  updateProfilePicture(data): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData('profile/change_profile_picture', data, true);
      this.gs.pushSubscription(subscription);
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

  forgotPassword(data): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('profile/forgot_password', data);
      this.gs.pushSubscription(subscription);
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

  setPassword(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData('profile/change_forgot_password', data);
      this.gs.pushSubscription(subscription);
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

  sendEmailVerification(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData('profile/send_email_verification', {});
      this.gs.pushSubscription(subscription);
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

  sendOtp(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData('profile/send_phone_otp', {});
      this.gs.pushSubscription(subscription);
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

  getLoyaltyHistory(pagination?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('loyalty-history', pagination, ordering);
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
}
