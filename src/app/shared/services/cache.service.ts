import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private tokenKey = 'klikgo-mobile-token';
  private recentKey = 'recent-search';
  private voucherKey = 'voucher-id';
  currentUser: any;
  googleUserInfo: any;
  fbToken: any;

  constructor(private storage: Storage) {}

  setToken(token: string) {
    return this.storage.set(this.tokenKey, token);
  }

  getToken() {
    return this.storage.get(this.tokenKey);
  }

  removeToken() {
    return this.storage.remove(this.tokenKey);
  }

  setCurrentUser(data: any, token: string) {
    this.setToken(token);
    this.currentUser = data;
    this.currentUser.token = token;
  }

  async removeCurrentUser() {
    this.currentUser = null;
    await this.removeToken();
  }

  setRecentSearch(data: any) {
    return this.storage.set(this.recentKey, data);
  }

  getRecentSearch() {
    return this.storage.get(this.recentKey);
  }

  removeRecentSearch() {
    return this.storage.remove(this.recentKey);
  }
  setVoucher(data: any) {
    return this.storage.set(this.voucherKey, data);
  }

  getVoucher() {
    return this.storage.get(this.voucherKey);
  }

  removeVoucher() {
    return this.storage.remove(this.voucherKey);
  }

  clearSocialInfo() {
    this.googleUserInfo = null;
    this.fbToken = null;
  }
}
