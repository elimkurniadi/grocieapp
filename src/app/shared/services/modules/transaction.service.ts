import { Injectable } from '@angular/core';
import { Page, ResponsePagination, Sort } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  add(body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('transaction', body);
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

  getTransaction(pagination?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`transaction`, pagination, ordering);
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

  getTransactionStatus(pagination?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`transaction/transaction_status`, pagination, ordering);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: ResponsePagination) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getTransactionHistory(pagination?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`transaction/history`, pagination, ordering);
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

  getTransactionDetail(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`transaction/${id}`);
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
}
