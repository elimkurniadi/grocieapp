import { Injectable } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CacheService } from './cache.service';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './core/api.service';
import { Response } from '@shared/models';

import { Plugins } from '@capacitor/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private cache: CacheService,
    private gs: GlobalService,
    private api: ApiService
  ) {
    this.checkToken();
  }

  checkToken() {
    this.cache.getToken().then((token) => {
      if (token) {
        const decoded = this.jwtHelper.decodeToken(token);
        const isExpired = this.jwtHelper.isTokenExpired(token);

        if (!isExpired) {
          this.cache.setCurrentUser(decoded, token);
          this.gs.log('not expired');
        } else {
          this.cache.removeToken();
          this.gs.log('expired');
        }
      }
    });
  }

  login(credentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.postData('authentication/login', credentials);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res: any) => {
          const token = res.response;
          this.loginByToken(token);
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  async loginGoogle() {
    const googleUser = await Plugins.GoogleAuth.signIn();
    const credentials = {
      user_token: googleUser.authentication.idToken,
      email: googleUser.email,
    };

    console.log('my user: ', googleUser);

    return true;
    // return this.login(credentials).toPromise();
  }

  async loginFb() {
    // const FACEBOOK_PERMISSIONS = ['public_profile','email'];
    const FACEBOOK_PERMISSIONS = ['email'];
    const result = await Plugins.FacebookLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    });

    const credentials = { user_token: result.accessToken.token };
    console.log('result: ', credentials);
    return true;
    // return this.login(credentials).toPromise();
  }
  isAuthenticated() {
    return new Observable<boolean>((observer) => {
      this.cache.getToken().then((token) => {
        if (token) {
          const decoded = this.jwtHelper.decodeToken(token);
          const isExpired = this.jwtHelper.isTokenExpired(token);

          // hide check condition expired token (temp)
          if (!isExpired) {
            this.cache.setCurrentUser(decoded, token);
            observer.next(true);
          } else {
            this.cache.removeCurrentUser();
            observer.next(false);
          }
        } else {
          observer.next(false);
        }
      });
    });
  }

  async logoutGoogle() {
    const logout = await Plugins.GoogleAuth.signOut();
  }

  async logoutFacebook() {
    const logout = await Plugins.FacebookLogin.logout();
  }

  loginByToken(token) {
    const decoded = this.jwtHelper.decodeToken(token);
    this.cache.setCurrentUser(decoded, token);
  }
}
