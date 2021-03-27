import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, GlobalService, ToastService } from '@shared/services';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalLocationComponent } from '@shared/common/modals/modal-location/modal-location.component';
import { BannerService, BundlingService, UserService } from '@shared/services/modules';
import { Banner, Bundling } from '@shared/models';
import { NotificationListComponent } from '../notification/notification-list/notification-list.component';
import { ModalOtpComponent } from '@shared/common/otp/modal-otp/modal-otp.component';
import { ActivityService } from '@shared/services/modules/activity.service';
import { ModalEmailVerificationComponent } from '@shared/common/email-verification/modal-email-verification/modal-email-verification.component';

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
    private userSrv: UserService,
    private activitySrv: ActivityService,
    private route: ActivatedRoute,
    private authSrv: AuthService,
    private toastCtrl: ToastController
  ) {
    this.route.queryParams.subscribe((param) => {
      const token = param.emailToken;
      if (token) {
        this.verifyEmail(token);
      }
    });
  }

  ngOnInit() {
    this.getBanner();
    this.getBundling();
    this.activitySrv.registerPush();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      header: `Push notification`,
      message: 'Your settings have been saved.',
      position: 'top',
      color: 'limegreen',
      buttons: [
        {
          side: 'end',
          text: 'Ok',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }

  doRefresh(event) {
    Promise.all([this.getBanner(), this.getBundling()]).then((success) => {
      event.target.complete();
    });
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
    this.router.navigate(['/qr', 'scan']);
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
    return this.bannerSrv
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
    return this.bundlingSrv
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

  verifyEmail(token) {
    this.authSrv
      .verifyEmail(token)
      .then(() => {
        const msg = this.translate.get('EMAIL_VERIFIED');
        this.toastSrv.show(msg);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
}
