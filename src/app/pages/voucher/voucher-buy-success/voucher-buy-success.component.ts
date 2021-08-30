import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-voucher-buy-success',
  templateUrl: './voucher-buy-success.component.html',
  styleUrls: ['./voucher-buy-success.component.scss'],
})
export class VoucherBuySuccessComponent implements OnInit {
  userData: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  get userEmail() {
    console.log('userdata', this.userData);
    return `<b>${this.userData?.email}</b>`;
  }
}
