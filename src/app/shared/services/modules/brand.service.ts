import { Injectable } from '@angular/core';
import { Response, Sort } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getFeaturedList(ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('brand/featured', null, ordering);
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