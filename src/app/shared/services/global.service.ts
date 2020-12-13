import { Injectable, isDevMode } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  subscriptionList: Subscription[] = [];
  constructor() {}

  log(message: string, data: any = null, type: string = 'log') {
    if (isDevMode()) {
      if (type === 'log') {
        if (data) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === 'error') {
        console.error(message, data);
      }
    }
  }

  pushSubscription(subcription) {
    this.subscriptionList.push(subcription);
  }

  unsubscribeSubscriptions() {
    this.subscriptionList.forEach((element) => {
      let exec;
      try {
        exec = element.unsubscribe();
      } catch {
        exec = null;
      }
    });
  }
}
