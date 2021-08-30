import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRouterOutlet, IonTabs, ModalController, NavController, Platform } from '@ionic/angular';
import { ModalOtpComponent } from '@shared/common/otp/modal-otp/modal-otp.component';
import { UserService } from '@shared/services/modules';

import { Plugins } from '@capacitor/core';
import { GlobalService } from '@shared/services';
const { App } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab;
  menus = [
    {
      icon: 'home-outline',
      icon_active: 'home-sharp',
      label: 'Store',
      route: 'home',
      selected: '',
    },
    {
      icon: 'heart-outline',
      icon_active: 'heart',
      label: 'Favorites',
      route: 'favorite',
      selected: '',
    },
    {
      icon: 'cart-outline',
      icon_active: 'cart',
      label: 'My Cart',
      route: 'cart',
      selected: '',
    },
    {
      icon: 'chatbubbles-outline',
      icon_active: 'chatbubbles',
      label: 'Chat',
      route: 'chat',
      selected: '',
    },
    {
      icon: 'person-outline',
      icon_active: 'person',
      label: 'Profile',
      route: 'profile',
      selected: '',
    },
  ];
  private activeTab?: HTMLElement;
  userData: any = null;

  constructor(
    private modalCtrl: ModalController,
    private userSrv: UserService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private gs: GlobalService
  ) {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      this.gs.log('Back press handler!');
      if (!this.routerOutlet.canGoBack()) {
        this.showExitConfirm();
        processNextHandler();
      } else {
        this.navCtrl.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      this.gs.log('Handler called to force close!');
      this.alertCtrl
        .getTop()
        .then((r) => {
          if (r) {
            navigator['app'].exitApp();
          }
        })
        .catch((e) => {
          this.gs.log(e);
        });
    });
  }

  showExitConfirm() {
    this.alertCtrl
      .create({
        header: 'App termination',
        message: 'Do you want to close the app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay',
            role: 'cancel',
            handler: () => {
              this.gs.log('Application exit prevented!');
            },
          },
          {
            text: 'Exit',
            handler: () => {
              navigator['app'].exitApp();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  ionViewWillLeave() {
    this.propagateToActiveTab('ionViewWillLeave');
  }

  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
  }

  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
  }

  ionViewDidEnter() {
    this.propagateToActiveTab('ionViewDidEnter');
  }

  private propagateToActiveTab(eventName: string) {
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }

  ngOnInit() {
    this.initMenuIcon();
    this.fetchUserData();
  }

  setCurrentTab(tabsRef: IonTabs) {
    this.activeTab = tabsRef.outlet.activatedView.element;

    this.initMenuIcon();
    const idx = this.menus.find((menu) => menu.route === this.tabs.getSelected());
    if (idx) {
      idx.selected = idx.icon_active;
    }
  }

  initMenuIcon() {
    this.menus.forEach((element) => {
      Object.assign(element, { selected: element.icon });
    });
  }

  async showModalOtp() {
    const modal = await this.modalCtrl.create({
      component: ModalOtpComponent,
    });
    return await modal.present();
  }

  fetchUserData() {
    this.userSrv.getProfile().then((res) => {
      this.userData = res;

      if (!this.userData.is_phone_verified) {
        this.showModalOtp();
      }
    });
  }
}
