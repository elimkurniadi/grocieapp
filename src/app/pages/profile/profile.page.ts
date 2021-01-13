import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { BrowserService } from '@shared/services/browser.service';

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

  constructor(
    private translateSrv: TranslateService,
    private appVersion: AppVersion,
    private router: Router,
    private browserSrv: BrowserService
  ) {
    this.getAppVersion();
    this.setupLanguage();
    this.initMenuList();
  }

  ngOnInit() {}

  initMenuList() {
    this.menuList = [
      {
        title: `${this.translateSrv.get('EDIT_PROFILE')}`,
        route: '/profile/edit',
        url: null,
      },
      {
        title: `${this.translateSrv.get('ADDRESS_LIST')}`,
        route: '/profile/address-list',
        url: null,
      },
      {
        title: `${this.translateSrv.get('ARTICLE')}`,
        route: '/article',
        url: null,
      },
      {
        title: `${this.translateSrv.get('LANGUAGE')}`,
        route: null,
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
    this.appVersion.getVersionNumber().then((value) => {
      this.currentVersion = value;
    });
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
}
