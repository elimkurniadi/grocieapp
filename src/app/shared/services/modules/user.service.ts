import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  register(data): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('profile/register', data);
      subscription.subscribe(
        (res: any) => {
          this.gs.pushSubscription(subscription);
          res.code === 201 ? resolve(res) : reject('!201');
        },
        (err) => {}
      );
    });
  }
}
