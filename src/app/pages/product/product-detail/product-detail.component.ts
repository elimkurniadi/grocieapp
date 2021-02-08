import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ModalAddToFavoriteComponent } from '@shared/common/modals/modal-add-to-favorite/modal-add-to-favorite.component';
import { Page, Product, ResponsePagination } from '@shared/models';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { CartService, ProductService } from '@shared/services/modules';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  isFavorite = false;
  productData: any = null;
  productId: number = null;
  page: Page;

  products: Product[];

  constructor(
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private productSrv: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private cartSrv: CartService,
    private modalCtrl: ModalController
  ) {
    this.observeParam();

    this.page = {
      row: 8,
      page: 1,
    };
  }

  ngOnInit() {}

  observeParam() {
    this.activatedRoute.params.subscribe((param) => {
      const id = param?.id;
      this.productId = id;
      this.fetchProductDetail(this.productId);
    });
  }

  fetchProductDetail(id) {
    this.productSrv.getProductDetail(id).then((res) => {
      this.productData = res;
      this.getRelatedProduct();
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  addItemToCart() {
    this.cartSrv.addToCart(this.productId).then((res) => {
      this.toastSrv.show(`${this.translateSrv.get('SUCCESS_ADD_TO_CART')}`);
    });
  }

  getRelatedProduct() {
    this.productSrv
      .getRelated(this.productData?.name, this.page)
      .then((res: ResponsePagination) => {
        const products = res.response.rows as Product[];
        this.products = products;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  async addToFavorite() {
    const modal = await this.modalCtrl.create({
      component: ModalAddToFavoriteComponent,
      cssClass: 'modal-add-to-favorite',
      componentProps: {
        productId: this.productId,
      },
    });

    modal.onDidDismiss().then(() => {
      // Refresh data
    });

    return await modal.present();
  }
}
