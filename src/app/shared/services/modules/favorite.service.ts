import { Injectable } from '@angular/core';
import { Response, Sort } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getList(ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('favourite_group', null, ordering);
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

  addData(body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('favourite_group', body);
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
