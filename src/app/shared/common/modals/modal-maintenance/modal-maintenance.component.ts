import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-maintenance',
  templateUrl: './modal-maintenance.component.html',
  styleUrls: ['./modal-maintenance.component.scss'],
})
export class ModalMaintenanceComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  exitApp() {
    navigator['app'].exitApp();
  }
}
