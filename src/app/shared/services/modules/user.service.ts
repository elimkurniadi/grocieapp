import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private api: ApiService,
    private gs: GlobalService,
    private toastSrv: ToastService,
    private authSrv: AuthService
  ) {}

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
        (err) => {
          if (err) {
            reject('!201');
          }
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
        (err) => {
          if (err) {
            reject('!200');
          }
        }
      );
    });
  }
}
