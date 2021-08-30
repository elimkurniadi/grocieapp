import { Injectable } from '@angular/core';

import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, map, timeout, retryWhen, catchError } from 'rxjs/operators';

import * as _ from 'lodash';
import { Platform } from '@ionic/angular';
import { HttpIonicService } from './http-ionic.service';
import { HttpAngularService } from './http-angular.service';
import { environment } from '@env/environment';

export const genericRetryStrategy =
  ({
    maxRetryAttempts = 3,
    scalingDuration = 5000,
    excludedStatusCodes = [],
  }: {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  } = {}) =>
  (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find((e) => e === error.status)) {
          return throwError(error);
        }
        // console.log(
        //   `Attempt ${retryAttempt}: retrying in ${retryAttempt *
        //     scalingDuration}ms`
        // );
        // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
      })
      // finalize(() => console.log('We are done!'))
    );
  };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http: HttpIonicService | HttpAngularService;

  constructor(
    private platform: Platform,
    private ionicHttp: HttpIonicService,
    private angularHttp: HttpAngularService
  ) {
    this.http =
      (this.platform.is('cordova') || this.platform.is('capacitor')) && environment.ssl
        ? this.ionicHttp
        : this.angularHttp;
  }

  getData(
    path: string,
    pagination?: any,
    ordering?: any,
    filter?: object,
    headers?: any,
    apiTimeout = 5000
  ): Observable<any> {
    return this.http.getData(environment.api_url + path, pagination, ordering, filter, headers).pipe(
      map((res: Response) => {
        return res;
      }),
      timeout(apiTimeout),
      // retry(3)
      retryWhen(
        genericRetryStrategy({
          scalingDuration: 5000,
          excludedStatusCodes: [400, 422, 404, 600],
        })
      ),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  postData(
    path: string,
    model: object = {},
    multipart = false,
    apiTimeout = 10000,
    httpHeaders?: any
  ): Observable<any> {
    if (multipart) {
      this.http = this.angularHttp;
    }
    return this.http.postData(environment.api_url + path, model, httpHeaders, multipart).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      map((res: any) => {
        return res;
      }),
      timeout(apiTimeout)
      // retry(3)
    );
  }

  patchData(
    path: string,
    model: object = {},
    multipart = false,
    httpHeaders?: any,
    apiTimeout = 10000
  ): Observable<any> {
    if (multipart) {
      this.http = this.angularHttp;
    }
    return this.http.patchData(environment.api_url + path, model, httpHeaders, multipart).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      map((res: Response) => {
        return res;
      }),
      timeout(apiTimeout)
    );
  }

  putData(path: string, model: object = {}, multipart = false, httpHeaders?: any, apiTimeout = 10000): Observable<any> {
    if (multipart) {
      this.http = this.angularHttp;
    }
    return this.http.putData(environment.api_url + path, model, httpHeaders, multipart).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      map((res: Response) => {
        return res;
      }),
      timeout(apiTimeout)
    );
  }

  deleteData(path: string, model: object = {}, httpHeaders?: any, apiTimeout = 10000): Observable<any> {
    return this.http.deleteData(environment.api_url + path, model, httpHeaders).pipe(
      catchError((err) => {
        return throwError(err);
      }),
      map((res: Response) => {
        return res;
      }),
      timeout(apiTimeout)
    );
  }
}
