import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-filter-product',
  templateUrl: './modal-filter-product.component.html',
  styleUrls: ['./modal-filter-product.component.scss'],
})
export class ModalFilterProductComponent implements OnInit {
  @Input() minPrice: number;
  @Input() maxPrice: number;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  apply() {
    this.dismiss({ minPrice: this.minPrice, maxPrice: this.maxPrice });
  }
}
