import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ModalAddToCartComponent } from '@shared/common/modals/modal-add-to-cart/modal-add-to-cart.component';
import { ModalAddToFavoriteComponent } from '@shared/common/modals/modal-add-to-favorite/modal-add-to-favorite.component';
import { Page, Product, ResponsePagination } from '@shared/models';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { GlobalService } from '@shared/services';
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
  maxQty = 0;
  products: Product[];
  isOnFetch = false;

  constructor(
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private productSrv: ProductService,
    private cartSrv: CartService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private router: Router,
    private gs: GlobalService
  ) {
    this.observeParam();

    this.page = {
      row: 8,
      page: 1,
    };
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.observeFetchState();
  }

  observeFetchState() {
    this.gs.observeOnFetch().subscribe((value: boolean) => {
      this.isOnFetch = value;
    });
  }

  scanQR() {
    // Scan barcode and QR function should be inserted here.
    this.router.navigate(['/qr', 'scan']);
  }

  observeParam() {
    this.activatedRoute.params.subscribe((param) => {
      const id = param?.id;
      this.productId = id;
      this.fetchProductDetail(this.productId);
    });
  }

  fetchProductDetail(id) {
    this.productSrv.getProductDetail(id).then((detail) => {
      this.productData = detail;
      this.cartSrv.getCartMaxQty(detail.product_id).then((res) => {
        this.maxQty = res.max_quantity;
        res.max_quantity > 0 ? (this.qty = 1) : (this.qty = 0);
      });
      this.getRelatedProduct();
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  addItemToCart() {
    if (this.qty > 0) {
      this.cartSrv
        .addToCart(this.productId, this.qty)
        .then((res) => {
          // Ini untuk recheck qty
          // this.fetchProductDetail(this.productId);
          this.presentModalSuccess();
        })
        .catch((err) => {
          this.gs.log('err', err);
        });
    } else {
    }
  }

  async presentModalSuccess() {
    const modal = await this.modalCtrl.create({
      component: ModalAddToCartComponent,
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss().then((data) => {
      if (data?.data === 'cart') {
        // this.navCtrl.navigateRoot(['tabs/cart']);
        this.navCtrl.navigateRoot(['tabs/cart']);
      }
    });

    return await modal.present();
  }

  getRelatedProduct() {
    this.productSrv
      .getRelated(this.productData?.product_id, this.page)
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
      if (this.qty < this.maxQty) this.qty += 1;
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

  get productTagBg() {
    return (
      'background: rgba(' +
      this.gs.hexToRgb(this.productData?.product_tag?.color).r +
      ',' +
      this.gs.hexToRgb(this.productData?.product_tag?.color).g +
      ',' +
      this.gs.hexToRgb(this.productData?.product_tag?.color).b +
      ', 0.2) !important'
    );
  }
}
