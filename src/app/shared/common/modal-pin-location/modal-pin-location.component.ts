import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-pin-location',
  templateUrl: './modal-pin-location.component.html',
  styleUrls: ['./modal-pin-location.component.scss'],
})
export class ModalPinLocationComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
