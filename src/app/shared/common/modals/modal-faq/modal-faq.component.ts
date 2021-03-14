import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BrowserService } from '@shared/services/browser.service';
import { SettingService } from '@shared/services/modules';

@Component({
  selector: 'app-modal-faq',
  templateUrl: './modal-faq.component.html',
  styleUrls: ['./modal-faq.component.scss'],
})
export class ModalFaqComponent implements OnInit {
  faqList;
  panelOpenState = false;
  constructor(
    private settingsSrv: SettingService,
    private modalCtrl: ModalController,
    private browserSrv: BrowserService
  ) {}

  ngOnInit() {
    this.settingsSrv.getFAQ().then((res) => {
      this.faqList = res?.response;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  goToChat() {
    const link = 'https://wa.me/628123045670?text=Halo saya ingin bertanya';
    this.browserSrv.openBrowser({ url: link });
  }
}
