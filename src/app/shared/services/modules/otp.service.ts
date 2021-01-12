import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  banCountdown = new BehaviorSubject(0);
  constructor(private api: ApiService, private gs: GlobalService) {}

  verifyEmail(otp): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = {
        token: otp,
      };
      const subscription = this.api.postData('authentication/verify_email', data);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          if (res.code === 200 && res.response) {
            resolve(true);
          } else {
            reject(false);
          }
        },
        () => {
          reject(false);
        }
      );
    });
  }

  setBanResendOtp() {
    this.banCountdown.next(15);
    let currentTime = this.banCountdown.getValue();

    const timer = setInterval(() => {
      if (currentTime > 0) {
        currentTime--;
        this.banCountdown.next(currentTime);
      } else {
        this.banCountdown.next(0);
        clearInterval(timer);
      }
    }, 1000);
  }
}
