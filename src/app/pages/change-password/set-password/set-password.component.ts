import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalInfoComponent } from '@shared/common/modals/modal-info/modal-info.component';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService } from '@shared/services';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private gs: GlobalService,
    private router: Router
  ) {}

  ngOnInit() {}

  setPassword() {
    this.presentSuccessModal();
  }

  async presentSuccessModal() {
    const modal = await this.modalCtrl.create({
      component: ModalInfoComponent,
      cssClass: 'modal-info',
      componentProps: {
        title: this.translate.get('CHANGE_PASSWORD_SUCCESS_TITLE'),
        message: this.translate.get('CHANGE_PASSWORD_SUCCESS_MESSAGE'),
        btnText: this.translate.get('LOGIN'),
      },
    });

    modal.onDidDismiss().then(() => {
      this.router.navigate(['/login', 'form']);
    });

    return await modal.present();
  }
}
