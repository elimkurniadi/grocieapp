import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { AuthService } from '@shared/services';
import { BrowserService } from '@shared/services/browser.service';
import { UserService } from '@shared/services/modules';

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
    private authSrv: AuthService
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
        route: '/',
        url: null,
      },
      {
        title: `${this.translateSrv.get('PRIVACY_POLICY')}`,
        route: null,
        url: 'https://google.com',
      },
      {
        title: `${this.translateSrv.get('TERMS_CONDITIONS')}`,
        route: null,
        url: 'https://facebook.com',
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

  logout() {
    this.authSrv.logout();
  }
}
