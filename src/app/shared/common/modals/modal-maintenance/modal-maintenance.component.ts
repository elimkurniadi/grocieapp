import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-modal-maintenance',
  templateUrl: './modal-maintenance.component.html',
  styleUrls: ['./modal-maintenance.component.scss'],
})
export class ModalMaintenanceComponent implements OnInit {
  constructor(private platform: Platform, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.exitApp();
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  exitApp() {
    navigator['app'].exitApp();
  }
}
