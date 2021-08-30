import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';

import * as _ from 'lodash';
import { CacheService } from '../cache.service';
import { GlobalService } from '../global.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HttpIonicService {
  isMaintenance = false;
  isUpdateForce = false;
  isUpdate = false;

  constructor(private http: HTTP, private cache: CacheService, private gs: GlobalService, private platform: Platform) {}

  getData(path: string, pagination?: object, ordering?: object, filter?: object, httpHeaders?: any) {
    const params = this.prepareHttpParams(pagination, ordering, filter);
    const options = {};
    const headers = this.prepareHeaders(httpHeaders);

    if (headers) {
      _.forEach(headers, (value, key) => {
        this.http.setHeader('*', String(key), String(value));
      });
      // Object.assign(options, { headers });
    }
    this.http.setDataSerializer('json');

    return from(
      this.http
        .get(path, params, headers)
        .then((res) => {
          return JSON.parse(res.data);
        })
        .catch((error) => {
          const err = error;
          if (this.isJson(error.error)) {
            err.error = JSON.parse(error.error);
          } else {
            err.error = { message: error.error };
          }
          this.handleError(err);
          throw err;
        })
    );
  }

  postData(path: string, model?: object, httpHeaders?: any, multipart = false) {
    const options = {};
    const headers = this.prepareHeaders(httpHeaders, multipart);

    if (headers) {
      _.forEach(headers, (value, key) => {
        this.http.setHeader('*', String(key), String(value));
      });
      // Object.assign(options, { headers });
    }
    this.http.setDataSerializer('json');

    let body = model;
    if (multipart) {
      body = this.prepareFormData(model);
      // return this.uploadFile(path, model, httpHeaders);
    }
    // } else {
    return from(
      this.http
        .post(path, body, headers)
        .then((res) => {
          return JSON.parse(res.data);
        })
        .catch((error) => {
          const err = error;
          if (this.isJson(error.error)) {
            err.error = JSON.parse(error.error);
          } else {
            err.error = { message: error.error };
          }
          this.handleError(err);
          throw err;
        })
    );
    // }
  }

  patchData(path: string, model?: object, httpHeaders?: any, multipart = false) {
    const options = {};
    const headers = this.prepareHeaders(httpHeaders, multipart);

    if (headers) {
      _.forEach(headers, (value, key) => {
        this.http.setHeader('*', String(key), String(value));
      });
      // Object.assign(options, { headers });
    }
    this.http.setDataSerializer('json');

    let body = model;
    if (multipart) {
      body = this.prepareFormData(model);
    }

    return from(
      this.http
        .patch(path, body, {})
        .then((res) => {
          return JSON.parse(res.data);
        })
        .catch((error) => {
          const err = error;
          if (this.isJson(error.error)) {
            err.error = JSON.parse(error.error);
          } else {
            err.error = { message: error.error };
          }
          this.handleError(err);
          throw err;
        })
    );
  }

  putData(path: string, model?: object, httpHeaders?: any, multipart = false) {
    const options = {};
    const headers = this.prepareHeaders(httpHeaders, multipart);

    if (headers) {
      _.forEach(headers, (value, key) => {
        this.http.setHeader('*', String(key), String(value));
      });
      // Object.assign(options, { headers });
    }

    let body = model;
    if (multipart) {
      body = this.prepareFormData(model);
    }
    this.http.setDataSerializer('json');

    return from(
      this.http
        .put(path, body, {})
        .then((res) => {
          return JSON.parse(res.data);
        })
        .catch((error) => {
          const err = error;
          if (this.isJson(error.error)) {
            err.error = JSON.parse(error.error);
          } else {
            err.error = { message: error.error };
          }
          this.handleError(err);
          throw err;
        })
    );
  }

  deleteData(path: string, model?: object, httpHeaders?: any) {
    const options = {};
    const headers = this.prepareHeaders(httpHeaders);

    if (headers) {
      _.forEach(headers, (value, key) => {
        this.http.setHeader('*', String(key), String(value));
      });
      // Object.assign(options, { headers });
    }
    this.http.setDataSerializer('json');

    return from(
      this.http
        .delete(path, model, {})
        .then((res) => JSON.parse(res.data))
        .catch((error) => {
          const err = error;
          if (this.isJson(error.error)) {
            err.error = JSON.parse(error.error);
          } else {
            err.error = { message: error.error };
          }
          this.handleError(err);
          throw err;
        })
    );
  }

  // uploadFile(path: string, model = {}, httpHeaders) {
  //   let filePath = 'file:///somepicture.jpg';
  //   const timestamp = moment().unix();
  //   const name = this.cache.currentUser
  //     ? this.cache.currentUser.name + '-' + timestamp.toString()
  //     : timestamp.toString();

  //   for (const key in model) {
  //     if (model.hasOwnProperty(key) && model[key] instanceof Blob) {
  //       filePath = `file://${model[key]}`;
  //     }
  //   }

  //   console.log('model', model);

  //   const headers = this.prepareHeaders(httpHeaders, false);

  //   if (headers) {
  //     _.forEach(headers, (value, key) => {
  //       this.http.setHeader('*', String(key), String(value));
  //     });
  //     // Object.assign(options, { headers });
  //   }
  //   this.http.setDataSerializer('json');

  //   console.log('filepath', filePath);
  //   return from(
  //     this.http
  //       .uploadFile(path, model, {}, filePath, name)
  //       .then((res) => {
  //         return JSON.parse(res.data);
  //       })
  //       .catch((error) => {
  //         const err = error;
  //         err.error = JSON.parse(error.error);
  //         this.handleError(err);
  //         throw err;
  //       })
  //   );
  // }

  private prepareHeaders(data: any, multipart = false) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const headers = {
      Accept: 'application/json',
      osType: this.platform.is('android') ? 'android' : 'ios',
      tz: encodeURIComponent(tz),
    };

    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          headers[key] = data[key].toString();
        }
      }
      data.forEach((res: any) => {
        headers[res.key] = res.value.toString();
      });
    }

    const headerKeys = Object.keys(headers);

    if (!multipart) {
      if (!headerKeys.includes('Content-Type')) {
        headers['Content-Type'] = 'application/json';
      }
    }

    if (!headerKeys.includes('Authorization')) {
      const currentUser = this.cache.currentUser;

      if (currentUser && currentUser.token) {
        headers['Authorization'] = `Bearer ${currentUser.token}`;
      }
    }

    return headers;
  }

  private prepareFormData(data: any) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
        // console.log(`form ${key}`, data[key]);
      }
    }

    return formData;
  }

  private prepareHttpParams(pagination: any, ordering: any, filter: any) {
    let params = {};

    if (!_.isEmpty(pagination)) {
      params = { ...params, row: pagination.row.toString(), page: pagination.page.toString() };
    } else {
      params = { ...params, pagination: 'false' };
    }

    if (!_.isEmpty(ordering)) {
      if (ordering.orderBy) {
        params = {
          ...params,
          order_by: ordering.orderBy.toString(),
        };
      }

      if (ordering.orderType) {
        params = {
          ...params,
          order_type: ordering.orderType.toString(),
        };
      }
    }

    if (!_.isEmpty(filter)) {
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          params[key] = filter[key].toString();
        }
      }
    }

    return params;
  }

  isJson(value: string) {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  handleError(error) {
    if (error.status === 0) {
      this.gs.log('No internet connection');
    }
  }
}
