import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService } from '@shared/services';
import { AlertService } from '@shared/services/alert.service';
import { OtpService } from '@shared/services/modules/otp.service';
import { UserService } from '@shared/services/modules/user.service';
import { ToastService } from '@shared/services/toast.service';
import * as moment from 'moment';
import { ModalSuccessComponent } from '../modal-success/modal-success.component';

@Component({
  selector: 'app-modal-otp',
  templateUrl: './modal-otp.component.html',
  styleUrls: ['./modal-otp.component.scss'],
})
export class ModalOtpComponent implements OnInit {
  otpConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };
  otpValue = null;
  countdown = null;
  constructor(
    private modalCtrl: ModalController,
    private alertSrv: AlertService,
    private translateSrv: TranslateService,
    private gs: GlobalService,
    private otpSrv: OtpService,
    private userSrv: UserService,
    private toastSrv: ToastService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.setupCountdown();
  }

  ionViewDidDismiss() {
    this.gs.unsubscribeSubscriptions();
  }

  setupCountdown() {
    const observer = this.otpSrv.banCountdown.asObservable();
    this.gs.pushSubscription(observer);
    this.setBanOtp();
    observer.subscribe((res) => {
      res === 0 ? (this.countdown = 0) : (this.countdown = res);
    });
  }

  setBanOtp() {
    this.otpSrv.setBanResendOtp();
  }

  formattedCountdown() {
    const seconds = this.countdown;
    const formatted = moment.utc(seconds * 1000).format('mm:ss');
    return formatted;
  }

  verifyOtp() {
    // POST AND CALL SHOWSUCCESSOTPMODAL FUNCTION

    this.showSuccessOtpModal();
  }

  onOtpChange(event) {
    this.otpValue = event;
  }

  dismiss() {
    this.alertSrv.presentAlert({
      message: `${this.translateSrv.get('CLOSE_CONFIRM')}`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.modalCtrl.dismiss();
          },
        },
        {
          text: `${this.translateSrv.get('CANCEL')}`,
          role: 'cancel',
        },
      ],
    });
  }

  async showSuccessOtpModal() {
    this.otpSrv.banCountdown.complete();
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ModalSuccessComponent,
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
    });
    return await modal.present();
  }
}
