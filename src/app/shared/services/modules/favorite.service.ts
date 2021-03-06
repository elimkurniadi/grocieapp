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

  getListByProduct(productId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`favourite_group/product/${productId}`);
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

  addToFavorite(body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('favourite', body);
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

  addToCart(body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('cart/favourite', body);
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

  getDetail(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`favourite_group/${id}`);
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

  getProductList(id: string, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('favourite', null, ordering, { favourite_group_id: id });
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

  deleteFavoriteList(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.deleteData(`favourite_group/${id}`);
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

  deleteFavoriteItem(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.deleteData(`favourite/${id}`);
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

  updateFavoriteList(id: string, name): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData(`favourite_group/${id}`, {name});
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
