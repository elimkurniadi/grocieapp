import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class ThirdPartyService {
  constructor(private gs: GlobalService, private http: HttpClient) {}

  getFbData(accessToken: any) {
    return new Promise((resolve, reject) => {
      const path = `https://graph.facebook.com/me?fields=name,email,picture.width(400).height(400)&access_token=${accessToken}`;
      const subscription = this.http.get(`${path}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
