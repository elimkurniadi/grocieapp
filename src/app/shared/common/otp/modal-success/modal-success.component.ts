import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalEmailVerificationComponent } from '@shared/common/email-verification/modal-email-verification/modal-email-verification.component';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.scss'],
})
export class ModalSuccessComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private alertSrv: AlertService,
    private translateSrv: TranslateService
  ) {}

  ngOnInit() {}

  dismiss() {
    this.router.navigateByUrl('/tabs/home', { replaceUrl: true }).then(() => {
      this.modalCtrl.dismiss();
      this.showAlertVerifyEmail();
    });
  }

  showAlertVerifyEmail() {
    this.alertSrv.presentAlert({
      header: `${this.translateSrv.get('VERIFY_EMAIL_HEADER')}`,
      message: `${this.translateSrv.get('VERIFY_EMAIL_BODY')}`,
      buttons: [
        {
          text: `${this.translateSrv.get('SKIP')}`,
          role: 'cancel',
        },
        {
          text: `${this.translateSrv.get('VERIFY')}`,
          handler: () => {
            this.showModalEmailVerification();
          },
        },
      ],
    });
  }

  async showModalEmailVerification() {
    const modal = await this.modalCtrl.create({
      component: ModalEmailVerificationComponent,
    });
    return await modal.present();
  }
}
