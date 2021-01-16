import { Injectable } from '@angular/core';
import { BrowserOpenOptions, Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
const { Browser } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  constructor() {}

  async openBrowser(config: BrowserOpenOptions) {
    await Browser.open(config);
  }

  listenOnBrowserFinished() {
    Browser.addListener('browserFinished', (res) => {
      return res;
    });
  }

  listenOnBrowserPageLoad() {
    Browser.addListener('browserPageLoaded', (res) => {
      return res;
    });
  }

  removeAllListeners() {
    Browser.removeAllListeners();
  }
}
