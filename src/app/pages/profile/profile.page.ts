import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { ModalController } from '@ionic/angular';
import { ModalSettingComponent } from '@shared/common/modals/modal-setting/modal-setting.component';
import { ModalShareAppComponent } from '@shared/common/modals/modal-share-app/modal-share-app.component';
import { Response, Setting } from '@shared/models';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { AuthService, ToastService } from '@shared/services';
import { BrowserService } from '@shared/services/browser.service';
import { SettingService, UserService } from '@shared/services/modules';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  menuList: any[] = null;

  currentLang = null;
  langList = null;
  currentVersion = null;
  userData: any = null;

  constructor(
    private translateSrv: TranslateService,
    private appVersion: AppVersion,
    private router: Router,
    private browserSrv: BrowserService,
    private userSrv: UserService,
    private authSrv: AuthService,
    private modalCtrl: ModalController,
    private settingSrv: SettingService,
    private toastSrv: ToastService
  ) {
    this.getAppVersion();
    this.setupLanguage();
    this.initMenuList();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.fetchUserData();
  }

  initMenuList() {
    this.menuList = [
      {
        title: `${this.translateSrv.get('MY_ORDERS')}`,
        route: '/orders',
        url: null,
      },
      {
        title: `${this.translateSrv.get('EDIT_PROFILE')}`,
        route: '/profile/edit',
        url: null,
      },
      {
        title: `${this.translateSrv.get('ADDRESS_LIST')}`,
        route: '/address',
        url: null,
      },
      {
        title: `${this.translateSrv.get('LANGUAGE')}`,
        route: null,
        url: null,
      },
      {
        title: `${this.translateSrv.get('SHARE_MY_APP')}`,
        route: null,
        modal: 'share',
      },
      {
        title: `${this.translateSrv.get('PRIVACY_POLICY')}`,
        route: null,
        modal: 'privacy_policy',
      },
      {
        title: `${this.translateSrv.get('TERMS_CONDITIONS')}`,
        route: null,
        modal: 'tnc',
      },
      {
        title: `${this.translateSrv.get('HELP_CENTER')}`,
        route: null,
        url: 'https://detik.com',
      },
    ];
  }

  getAppVersion() {
    this.appVersion
      .getVersionNumber()
      .then((value) => {
        this.currentVersion = value;
      })
      .catch(() => {});
  }

  setupLanguage() {
    this.currentLang = this.translateSrv.lang;
    this.langList = this.translateSrv.listLang;
  }

  onSelectLang(value) {
    this.translateSrv.setLanguage(value);
    this.currentLang = this.translateSrv.lang;
    this.initMenuList();
  }

  onMenuClick(menu) {
    if (menu?.route) {
      this.router.navigate([`${menu?.route}`]);
    } else if (menu?.url) {
      this.browserSrv.openBrowser({ url: menu?.url });
    } else if (menu?.modal) {
      this.showModal(menu?.modal);
    } else {
      return;
    }
  }

  showModal(modal: string) {
    if (modal === 'tnc') {
      this.showTnc();
    } else if (modal === 'privacy_policy') {
      this.showPrivacyPolicy();
    } else if (modal === 'share') {
      this.showShareAppModal();
    } else {
      return;
    }
  }

  fetchUserData(event = null) {
    this.userSrv
      .getProfile()
      .then((res) => {
        this.userData = res;
        if (event) {
          event.target.complete();
        }
      })
      .catch(() => {
        if (event) {
          event.target.complete();
        }
      });
  }

  showTnc() {
    this.settingSrv
      .getTnc()
      .then((res: Response) => {
        const data = res.response as Setting;
        data.name = this.translateSrv.get('TERMS_CONDITIONS');
        this.showSettingModal(data);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  showPrivacyPolicy() {
    this.settingSrv
      .getPrivacyPolicy()
      .then((res: Response) => {
        const data = res.response as Setting;
        data.name = this.translateSrv.get('PRIVACY_POLICY');
        this.showSettingModal(data);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  async showSettingModal(data: Setting) {
    const modal = await this.modalCtrl.create({
      component: ModalSettingComponent,
      componentProps: {
        title: data.name,
        content: data.content,
      },
    });

    return await modal.present();
  }

  async showShareAppModal() {
    const modal = await this.modalCtrl.create({
      component: ModalShareAppComponent,
      cssClass: 'modal-share-app',
    });

    return await modal.present();
  }

  logout() {
    this.authSrv.logout();
  }
}
