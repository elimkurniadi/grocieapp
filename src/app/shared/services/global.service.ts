import { Injectable, isDevMode } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  subscriptionList: Subscription[] = [];
  fetchSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  observeOnFetch(): Observable<boolean> {
    return this.fetchSubject.asObservable();
  }

  setOnFetchState(isOnFetch: boolean) {
    this.fetchSubject.next(isOnFetch);
  }

  returnButtonState() {
    this.observeOnFetch().subscribe((value) => {
      return value;
    });
  }

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

  chunk(array: any[], size: number) {
    const chunkedArr = [];
    const copied = [...array];
    const numOfChild = Math.ceil(copied.length / size);
    for (let i = 0; i < numOfChild; i++) {
      chunkedArr.push(copied.splice(0, size));
    }
    return chunkedArr;
  }
  getErrorMessage(err: { code?: number; error?: any }) {
    this.log('err', err, 'error');
    const resError = err.error;
    if (err) {
      if (err.code === 400) {
        return resError.message;
      }
      if (err.code === 0) {
        return 'Koneksi terputus, silahkan coba lagi';
      } else {
        if (isDevMode()) {
          const errors = _.isArray(err.error.message.errors) ? err.error.message.errors : err.error.message;
          return _.isArray(err.error.message.errors) ? _.map(errors, 'msg').join(' ') : errors;
        } else {
          const errors = _.isArray(err.error.message.errors) ? err.error.message.errors : err.error.message;
          return _.isArray(err.error.message.errors) ? _.map(errors, 'msg').join(' ') : errors;
        }
      }
    } else {
      return 'Terjadi kesalahan, silahkan coba lagi nanti';
    }
  }

  numberWithCommas(x: any) {
    return x
      .toString()
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  numberWithCurrency(value: any) {
    // check for decimal
    if (value.indexOf('.') >= 0) {
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      const decimalPos = value.indexOf('.');

      // split number by decimal point
      let leftSide = value.substring(0, decimalPos);
      let rightSide = value.substring(decimalPos);

      // add commas to left side of number
      leftSide = this.numberWithCommas(leftSide);

      // validate right side
      rightSide = this.numberWithCommas(rightSide);

      // join number by .
      value = 'Rp. ' + leftSide + '.' + rightSide;
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      value = this.numberWithCommas(value);
      value = 'Rp. ' + value;
    }

    return value;
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

  markDirtyForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.get(key).markAsDirty();
    });
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  get timezoneName() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}
