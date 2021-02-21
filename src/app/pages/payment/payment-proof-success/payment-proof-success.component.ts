import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-proof-success',
  templateUrl: './payment-proof-success.component.html',
  styleUrls: ['./payment-proof-success.component.scss'],
})
export class PaymentProofSuccessComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
