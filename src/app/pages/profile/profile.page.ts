import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { TranslateService } from '@shared/pipes/translate/translate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  menuList = [
    {
      title: 'Edit Profile',
      route: '/edit',
    },
    {
      title: 'Address List',
      route: '/address-list',
    },
    {
      title: 'Article',
      route: '/article',
    },
    {
      title: 'Language',
      route: null,
    },
    {
      title: 'Privacy Policy',
      route: '/pnp',
    },
    {
      title: 'Terms and Conditions',
      route: '/tnc',
    },
    {
      title: 'Help Center',
      route: '/help',
    },
  ];

  currentLang = null;
  langList = null;
  currentVersion = null;

  constructor(private translateSrv: TranslateService, private appVersion: AppVersion) {
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
}
