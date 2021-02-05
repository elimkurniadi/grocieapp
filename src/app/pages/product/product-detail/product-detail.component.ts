import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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

  constructor(
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private productSrv: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private cartSrv: CartService
  ) {
    this.observeParam();
  }

  ngOnInit() {}

  ctaFavorite() {
    this.isFavorite = !this.isFavorite;
    const message = this.isFavorite
      ? this.translateSrv.get('SUCCESS_ADD_FAVORITE')
      : this.translateSrv.get('SUCCESS_REMOVE_FAVORITE');
    this.toastSrv.show(message);
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
      this.productData = res;
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  addItemToCart() {
    this.cartSrv.addToCart(this.productId).then((res) => {
      console.log('res: ', res);
      this.toastSrv.show(`${this.translateSrv.get('SUCCESS_ADD_TO_CART')}`);
    });
  }
}
