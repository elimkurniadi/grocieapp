import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ModalAddToCartComponent } from '@shared/common/modals/modal-add-to-cart/modal-add-to-cart.component';
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
  qty = 0;

  products: Product[];

  constructor(
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private productSrv: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private cartSrv: CartService,
    private modalCtrl: ModalController,
    private router: Router,
  ) {
    this.observeParam();

    this.page = {
      row: 8,
      page: 1,
    };
  }

  ngOnInit() { 

  }

  scanQR() {
    // Scan barcode and QR function should be inserted here.
    console.log('Test logging QR code');
  }

  observeParam() {
    this.activatedRoute.params.subscribe((param) => {
      const id = param?.id;
      this.productId = id;
      this.fetchProductDetail(this.productId);
    });
  }

  fetchProductDetail(id) {
    this.productSrv.getProductDetail(id).then((res) => {
      console.log('RES', res);
      this.productData = res;
      this.getRelatedProduct();

      if(this.productData?.stock > 0)
        this.qty = 1;
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  addItemToCart() {
    if (this.qty > 0) {
      this.cartSrv.addToCart(this.productId, this.qty).then((res) => {
        // this.toastSrv.show(`${this.translateSrv.get('SUCCESS_ADD_TO_CART')}`);

        // Ini untuk recheck qty
        // this.fetchProductDetail(this.productId);

        this.presentModal();
      });
    } else {

    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalAddToCartComponent,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data?.data === 'cart') {
        // this.navCtrl.navigateRoot(['tabs/cart']);
        this.navCtrl.navigateRoot(['tabs/cart']);
      }
    })

    return await modal.present();
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

  updateLocalQuantity(increment) {
    if (increment) {
      if (this.qty < this.productData?.stock)
        this.qty += 1;
    } else {
      if (this.qty > 0) {
        this.qty -= 1;
      }
    }
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