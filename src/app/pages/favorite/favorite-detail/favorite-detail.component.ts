import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  totalSelectedItem = 0;

  constructor(private route: ActivatedRoute, private favoriteSrv: FavoriteService, private toastSrv: ToastService) {
    this.route.params.subscribe((param) => {
      if (param.id !== null) {
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

  calculateSelectedItem() {
    if (this.productFavorites) {
      const productSelected = this.productFavorites.filter((product) => {
        return product.selected;
      });

      this.totalSelectedItem = productSelected.length;
    }
  }
}
