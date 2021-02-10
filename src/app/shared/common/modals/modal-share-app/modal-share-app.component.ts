import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { ToastService } from '@shared/services';
import { TranslateService } from '@shared/pipes/translate/translate.service';
const { Clipboard } = Plugins;

@Component({
  selector: 'app-modal-share-app',
  templateUrl: './modal-share-app.component.html',
  styleUrls: ['./modal-share-app.component.scss'],
})
export class ModalShareAppComponent implements OnInit {
  shareLink = 'http://bit.ly/gtasamac';

  constructor(
    private modalCtrl: ModalController,
    private toastSrv: ToastService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  copyLink() {
    Clipboard.write({
      string: this.shareLink,
    });

    this.toastSrv.show(this.translate.get('COPIED_SUCCESS'));
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
