import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { Router } from '@angular/router';
import { GlobalService, ToastService } from '@shared/services';
import { ModalController } from '@ionic/angular';
import { ModalLocationComponent } from '@shared/common/modals/modal-location/modal-location.component';
import { BannerService, BundlingService, UserService } from '@shared/services/modules';
import { Banner, Bundling } from '@shared/models';
import { NotificationListComponent } from '../notification/notification-list/notification-list.component';
import { ModalOtpComponent } from '@shared/common/otp/modal-otp/modal-otp.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectedLanguage: any = 'id';
  banners: Banner[];
  bundlings: Bundling[];

  constructor(
    private translate: TranslateService,
    private router: Router,
    private toastSrv: ToastService,
    private bannerSrv: BannerService,
    private bundlingSrv: BundlingService,
    private modalCtrl: ModalController,
    private userSrv: UserService
  ) {}

  ngOnInit() {
    this.getBanner();
    this.getBundling();
  }

  selectLang(lang) {
    this.selectedLanguage = lang;
    this.translate.setLanguage(lang);
  }

  async openNotification() {
    const modal = await this.modalCtrl.create({
      component: NotificationListComponent,
    });

    modal.onDidDismiss().then(() => {
      // Refresh data
    });

    return await modal.present();
  }

  searchProduct() {
    this.router.navigate(['/product', 'search']);
  }

  scanQR() {
    // Scan barcode and QR function should be inserted here.
    console.log('Test logging QR code');
  }

  async changeLocation() {
    const modal = await this.modalCtrl.create({
      component: ModalLocationComponent,
    });

    modal.onDidDismiss().then(() => {
      // Refresh data
    });

    return await modal.present();
  }

  getBanner() {
    this.bannerSrv
      .getList()
      .then((res) => {
        const banners = res.response as Banner[];
        this.banners = banners;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
  getBundling() {
    this.bundlingSrv
      .getList()
      .then((res) => {
        const bundlings = res.response.rows as Bundling[];
        this.bundlings = bundlings;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
}
