import { Component, Injectable, ErrorHandler } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '@env/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { AuthService, GlobalService } from '@shared/services';
import { ModalMaintenanceComponent } from '@shared/common/modals/modal-maintenance/modal-maintenance.component';
import { SettingService } from '@shared/services/modules';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Router } from '@angular/router';

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
    private authSrv: AuthService,
    private modalCtrl: ModalController,
    private settingSrv: SettingService,
    private deeplinks: Deeplinks,
    private router: Router
  ) {
    this.authSrv.checkToken();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkMaintenance();
      this.setDeepLink();
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

  checkMaintenance() {
    this.settingSrv
      .checkMaintenance()
      .then((res) => {
        const isMaintenance = res.response;
        if (isMaintenance) {
          this.showMaintenanceModal();
        }
      })
      .catch((err) => {
        this.gs.log(err);
      });
  }

  async showMaintenanceModal() {
    const modal = await this.modalCtrl.create({
      component: ModalMaintenanceComponent,
    });
    return await modal.present();
  }

  setDeepLink() {
    this.deeplinks
      .route({
        '/set-password': '/set-password/:forgotToken',
        '/tabs-home': '/email-verification/:emailToken',
      })
      .subscribe(
        (match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data

          this.gs.log('Successfully matched route', match);
          // console.log('Successfully matched route', match);
          if (match.$route === '/set-password/:forgotToken') {
            this.router.navigateByUrl(`/set-password/${match.$args.forgotToken}`);
          } else if (match.$route === '/email-verification/:emailToken') {
            this.router.navigateByUrl(`/tabs/home?emailToken=${match.$args.emailToken}`);
          }
        },
        (nomatch) => {
          // nomatch.$link - the full link data
          this.gs.log("Got a deeplink that didn't match", nomatch, 'error');
        }
      );
  }
}
