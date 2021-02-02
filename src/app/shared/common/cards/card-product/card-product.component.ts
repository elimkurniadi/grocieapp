import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAddToFavoriteComponent } from '@shared/common/modals/modal-add-to-favorite/modal-add-to-favorite.component';
import { Product } from '@shared/models';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private modalCtrl: ModalController) {}

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
}
