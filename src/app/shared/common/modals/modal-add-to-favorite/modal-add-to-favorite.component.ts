import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Favorite, Response } from '@shared/models';
import { ToastService } from '@shared/services';
import { FavoriteService } from '@shared/services/modules';

@Component({
  selector: 'app-modal-add-to-favorite',
  templateUrl: './modal-add-to-favorite.component.html',
  styleUrls: ['./modal-add-to-favorite.component.scss'],
})
export class ModalAddToFavoriteComponent implements OnInit {
  @Input() productId: string;
  favorites: Favorite[];
  favoriteAdded: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private favoriteSrv: FavoriteService,
    private toastSrv: ToastService
  ) {}

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites() {
    this.favoriteSrv
      .getListByProduct(this.productId)
      .then((res: Response) => {
        const favorites = res.response as Favorite[];
        this.favorites = favorites;

        const favoriteSelected = this.favorites.filter((favorite) => {
          return favorite.is_product_added;
        });
        this.favoriteAdded = favoriteSelected.map((item: Favorite) => item.favourite_group_id);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  addProductToFavorite() {
    const favoriteSelected = this.favorites.filter((favorite) => {
      return favorite.is_product_added && !this.favoriteAdded.includes(favorite.favourite_group_id);
    });
    const favoriteIds = favoriteSelected.map((item: Favorite) => parseInt(item.favourite_group_id, 10));

    if (favoriteIds && favoriteIds.length) {
      const body = {
        product_id: this.productId,
        favourite_group: favoriteIds,
      };

      this.favoriteSrv
        .addToFavorite(body)
        .then((res: Response) => {
          this.toastSrv.show('Added to favorite list');
          this.dismiss();
        })
        .catch((err) => {
          const error = err.error.error;
          this.toastSrv.show(error.message);
        });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
