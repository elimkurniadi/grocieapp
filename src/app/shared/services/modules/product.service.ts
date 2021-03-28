import { Injectable } from '@angular/core';
import { Page, Response, ResponsePagination, Sort } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getListByBundling(bundlingId: string, pagination?: Page, ordering?: Sort, filter?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`product/bundling/${bundlingId}`, pagination, ordering, filter);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: ResponsePagination) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getListByCategory(categoryId: string, pagination?: Page, ordering?: Sort, filter?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`product/category/${categoryId}`, pagination, ordering, filter);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: ResponsePagination) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getProductDetail(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`product/${id}`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getFeaturedProduct(pagination: Page = null, order: Sort = null): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('product/featured', pagination, order);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res?.response?.rows);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getListByBrand(brandId: string, pagination?: Page, ordering?: Sort, filter?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`product/brand/${brandId}`, pagination, ordering, filter);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: ResponsePagination) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getRelated(productId: string, pagination?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`product/related/${productId}`, pagination, ordering);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: ResponsePagination) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getListByKeyword(keyword: string, pagination?: Page, ordering?: Sort, filter?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`product/search/${keyword}`, pagination, ordering, filter);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: ResponsePagination) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getPopular(pagination?: Page, ordering?: Sort, filter?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`product/popular`, pagination, ordering, filter);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: ResponsePagination) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getBySKU(sku: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`product/sku/${sku}`);
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
