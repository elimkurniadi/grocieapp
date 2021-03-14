import { Component, OnInit, SecurityContext } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { ToastService } from '@shared/services';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { SettingService } from '@shared/services/modules';
import { DomSanitizer } from '@angular/platform-browser';
const { Clipboard } = Plugins;

@Component({
  selector: 'app-modal-share-app',
  templateUrl: './modal-share-app.component.html',
  styleUrls: ['./modal-share-app.component.scss'],
})
export class ModalShareAppComponent implements OnInit {
  shareLink;

  constructor(
    private modalCtrl: ModalController,
    private toastSrv: ToastService,
    private translate: TranslateService,
    private settingSrv: SettingService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.settingSrv.getShareApp().then((res) => {
      const safeHTML = this.domSanitizer.bypassSecurityTrustHtml(res?.content);
      this.shareLink = this.domSanitizer.sanitize(SecurityContext.HTML, safeHTML);
    });
  }

  copyLink() {
    const parser = new DOMParser();
    const stringParser = parser.parseFromString(this.shareLink, 'text/html').body.textContent;

    Clipboard.write({
      string: stringParser,
    });

    this.toastSrv.show(this.translate.get('COPIED_SUCCESS'));
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
