import { Injectable } from '@angular/core';
import { Page, Response, Sort } from '@shared/models';
import { ApiService } from '../core/api.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private api: ApiService, private gs: GlobalService) {}

  getList(pagination: Page, filter: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('branch', pagination, null, filter);
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

  getListWithFilter(pagination, filter: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData('branch/search', pagination, null, filter);
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

  selectBranch(branchId): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.putData(`profile/change_branch`, { branch_id: branchId });
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
