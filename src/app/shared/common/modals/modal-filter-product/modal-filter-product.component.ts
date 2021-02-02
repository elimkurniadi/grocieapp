import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-filter-product',
  templateUrl: './modal-filter-product.component.html',
  styleUrls: ['./modal-filter-product.component.scss'],
})
export class ModalFilterProductComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
