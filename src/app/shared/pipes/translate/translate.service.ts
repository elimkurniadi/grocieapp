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
    this.lang = sessionStorage.getItem(this.prefix) || 'en';
    this.setLanguage(this.lang);
  }

  setLanguage(value) {
    this.lang = value;
    sessionStorage.setItem(this.prefix, value);
    this.languagesObject = require(`../../../i18n/${value}.json`);
  }

  get(key, args?: object) {
    try {
      let msg = this.languagesObject[key];

      for (const hashKey in args) {
        if (args.hasOwnProperty(hashKey)) {
          const argKey = `%${hashKey}%`;
          const argValue = args[hashKey];
          msg = msg.replaceAll(argKey, argValue);
        }
      }
      return msg;
    } catch (error) {}
  }
}
