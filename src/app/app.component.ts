import { Component, Injectable, ErrorHandler } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '@env/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { AuthService, GlobalService } from '@shared/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpSSL: HTTP,
    private gs: GlobalService,
    private authSrv: AuthService
  ) {
    this.authSrv.checkToken();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setSslPinning() {
    if (environment.ssl && (this.platform.is('cordova') || this.platform.is('capacitor'))) {
      this.httpSSL
        .setServerTrustMode('pinned')
        // this.httpSSL
        //   .setSSLCertMode('pinned')
        .then((res) => {
          this.gs.log('SSL PINNING SUCCESS', res);
        })
        .catch((err) => {
          this.gs.log('SSL PINNING FAILED', err);
        });
    }
  }
}
