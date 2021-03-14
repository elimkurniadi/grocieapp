import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Favorite, ProductFavorite, Response } from '@shared/models';
import { ToastService } from '@shared/services';
import { FavoriteService } from '@shared/services/modules';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.component.html',
  styleUrls: ['./favorite-detail.component.scss'],
})
export class FavoriteDetailComponent implements OnInit {
  id: string;
  productFavorites: ProductFavorite[];
  favorite: Favorite;
  selectedItem = [];
  selectAll = false;

  constructor(
    private route: ActivatedRoute,
    private favoriteSrv: FavoriteService,
    private toastSrv: ToastService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.id = param.id;
      }
    });
  }

  ngOnInit() {
    if (this.id !== null || this.id !== '') {
      this.getDetail();
      this.getProductList();
    }
  }

  getDetail() {
    this.favoriteSrv
      .getDetail(this.id)
      .then((res: Response) => {
        const favorite = res.response as Favorite;
        this.favorite = favorite;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
  getProductList() {
    this.favoriteSrv
      .getProductList(this.id)
      .then((res: Response) => {
        const productFavorites = res.response as ProductFavorite[];
        productFavorites.forEach((productFavorite) => {
          productFavorite.selected = false;
        });

        this.productFavorites = productFavorites;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  toggleSelect(index: any) {
    this.productFavorites[index].selected = !this.productFavorites[index].selected;

    this.calculateSelectedItem();
  }

  toggleSelectAll() {
    this.productFavorites.forEach((product) => {
      product.selected = true;
    });
    this.selectAll = true;
    this.calculateSelectedItem();
  }

  calculateSelectedItem() {
    if (this.productFavorites) {
      const productSelected = this.productFavorites.filter((product) => {
        return product.selected;
      });

      this.selectedItem = productSelected;
    }
  }

  addToCart() {
    const favoriteIds = this.selectedItem.map((item: ProductFavorite) => parseInt(item.favourite_id, 10));
    const body = {
      favourite_group_id: this.id,
      favourite_id: favoriteIds,
    };

    this.favoriteSrv
      .addToCart(body)
      .then((res: Response) => {
        this.router.navigate(['/tabs', 'cart']);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  delete(item) {
    this.presentAlertConfirm(item);
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Delete Item',
      message: 'Are you sure you want to delete' + '<strong> ' + item?.product?.name + '</strong> ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'modal-confirm',
        },
        {
          text: 'Yes',
          cssClass: 'modal-confirm',
          handler: () => {
            this.favoriteSrv.deleteFavoriteItem(item.favourite_id).then((res) => {
              this.getProductList();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
