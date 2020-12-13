import { Injectable, Inject } from '@angular/core';

declare const require;

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private prefix = 'multi-lang';
  private languagesObject;
  public listLang = ['en', 'id'];
  public lang;

  constructor() {
    this.lang = sessionStorage.getItem(this.prefix) || 'id';
    this.setLanguage(this.lang);
  }

  setLanguage(value) {
    this.lang = value;
    sessionStorage.setItem(this.prefix, value);
    this.languagesObject = require(`../../../i18n/${value}.json`);
  }

  get(key) {
    try {
      return this.languagesObject[key];
    } catch (error) {}
  }
}
