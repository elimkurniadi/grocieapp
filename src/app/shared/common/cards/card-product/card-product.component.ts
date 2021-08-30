import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAddToFavoriteComponent } from '@shared/common/modals/modal-add-to-favorite/modal-add-to-favorite.component';
import { Product } from '@shared/models';
import { GlobalService } from '@shared/services';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private gs: GlobalService, private modalCtrl: ModalController) {}

  ngOnInit() {}

  async addToFavorite(productId: string) {
    const modal = await this.modalCtrl.create({
      component: ModalAddToFavoriteComponent,
      cssClass: 'modal-add-to-favorite',
      componentProps: {
        productId,
      },
    });

    modal.onDidDismiss().then(() => {
      // Refresh data
    });
    return await modal.present();
  }

  get productTagBg() {
    return (
      'background: rgba(' +
      this.gs.hexToRgb(this.product?.product_tag?.color).r +
      ',' +
      this.gs.hexToRgb(this.product?.product_tag?.color).g +
      ',' +
      this.gs.hexToRgb(this.product?.product_tag?.color).b +
      ', 0.2) !important'
    );
  }
}
