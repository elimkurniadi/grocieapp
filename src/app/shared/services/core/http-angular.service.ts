import { Injectable } from '@angular/core';

import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as _ from 'lodash';

export const genericRetryStrategy =
  ({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
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
export class HttpAngularService {
  constructor(private http: HttpClient) {}

  getData(path: string, pagination?: any, ordering?: any, filter?: object, httpHeaders?: any) {
    const params = this.prepareHttpParams(pagination, ordering, filter);
    const options = { params };
    const headers = this.prepareHeaders(httpHeaders);
    if (headers) {
      Object.assign(options, { headers });
    }

    return this.http.get(path, options);
  }

  postData(path: string, model?: object, httpHeaders?: any, multipart = false) {
    const options = {};
    const headers = this.prepareHeaders(httpHeaders, multipart);

    if (headers) {
      Object.assign(options, { headers });
    }

    let body = model;
    if (multipart) {
      body = this.prepareFormData(model);
    }

    return this.http.post(path, body, options);
  }

  patchData(path: string, model?: object, httpHeaders?: any, multipart = false) {
    const options = {};
    const headers = this.prepareHeaders(httpHeaders, multipart);

    if (headers) {
      Object.assign(options, { headers });
    }

    let body = model;
    if (multipart) {
      body = this.prepareFormData(model);
    }

    return this.http.patch(path, body, options);
  }

  putData(path: string, model?: object, httpHeaders?: any, multipart = false) {
    const options = {};
    const headers = this.prepareHeaders(httpHeaders, multipart);

    if (headers) {
      Object.assign(options, { headers });
    }

    let body = model;
    if (multipart) {
      body = this.prepareFormData(model);
    }

    return this.http.put(path, body, options);
  }

  deleteData(path: string, model?: object, httpHeaders?: any) {
    const options = {};
    const headers = this.prepareHeaders(httpHeaders);

    if (headers) {
      Object.assign(options, { headers });
    }
    return this.http.delete(path, options);
  }

  private prepareHeaders(data: any, multipart = false) {
    let headers = null;

    if (data) {
      headers = new HttpHeaders();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          headers = headers.append(key.toString(), data[key].toString());
        }
      }
    }

    if (multipart) {
      if (!headers) {
        headers = new HttpHeaders();
      }
      headers = headers.append('Content-Type', 'multipart/form-data');
    }

    return headers;
  }

  private prepareFormData(data) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return formData;
  }

  private prepareHttpParams(pagination: any, ordering: any, filter: any) {
    let params = new HttpParams();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    params = params.append('tz', encodeURIComponent(tz));

    if (!_.isEmpty(pagination)) {
      params = params.append('row', pagination.row.toString());
      params = params.append('page', pagination.page.toString());
    } else {
      params = params.append('pagination', 'false');
    }

    if (!_.isEmpty(ordering)) {
      if (ordering.orderBy) {
        params = params.append('order_by', ordering.orderBy);
      }
      if (ordering.orderType) {
        params = params.append('order_type', ordering.orderType);
      }
    }

    if (!_.isEmpty(filter)) {
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          if (_.isArray(filter[key])) {
            for (const index in filter[key]) {
              if (filter[key].hasOwnProperty(index)) {
                params = params.append(key, filter[key][index]);
              }
            }
          } else {
            params = params.append(key, filter[key]);
          }
        }
      }
    }

    return params;
  }
}
