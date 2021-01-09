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
  menuList = [
    {
      title: 'Edit Profile',
      route: '/profile/edit',
      url: null,
    },
    {
      title: 'Address List',
      route: '/profile/address-list',
      url: null,
    },
    {
      title: 'Article',
      route: '/article',
      url: null,
    },
    {
      title: 'Language',
      route: null,
      url: null,
    },
    {
      title: 'Privacy Policy',
      route: null,
      url: 'https://google.com',
    },
    {
      title: 'Terms and Conditions',
      route: null,
      url: 'https://facebook.com',
    },
    {
      title: 'Help Center',
      route: null,
      url: 'https://detik.com',
    },
  ];

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
  }

  ngOnInit() {}

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
