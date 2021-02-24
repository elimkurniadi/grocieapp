import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-to-cart',
  templateUrl: './modal-add-to-cart.component.html',
  styleUrls: ['./modal-add-to-cart.component.scss'],
})
export class ModalAddToCartComponent implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {}

  dismiss(data) {
    this.modalCtrl.dismiss(data);
  }


}
