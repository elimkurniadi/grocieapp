import { Injectable } from '@angular/core';
import { Response } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private api: ApiService, private gs: GlobalService) { }

  getArticle():Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('blog');
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
