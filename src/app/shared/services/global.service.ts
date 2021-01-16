import { Injectable, isDevMode } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  countChar(value) {
    let char = '';
    char = value;
    const charLength = char ? char.length : 0;
    return charLength;
  }

  getChangedFormProperties(form: any) {
    const dirtyValues = {};
    Object.keys(form.controls).forEach((key) => {
      const currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls) dirtyValues[key] = this.getChangedFormProperties(currentControl);
        else dirtyValues[key] = currentControl.value;
      }
    });
    return dirtyValues ? dirtyValues : null;
  }
}
