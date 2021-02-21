import { Component, OnInit } from '@angular/core';
import { CartService, ProductService } from '@shared/services/modules';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartList: any[] = null;
  relatedProductList: any[] = null;
  totalPrice = 0;

  constructor(private cartSrv: CartService, private productSrv: ProductService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.fetchCartList();
    this.fetchRelatedProductList();
  }

  pullToRefresh(event) {
    this.fetchCartList();
    this.fetchRelatedProductList();
    event.target.complete();
  }

  initTotalPrice() {
    this.cartSrv.calculateSumPrice(this.cartList).then((res) => {
      this.totalPrice = res;
    });
  }

  updateTotalPrice(value) {
    this.totalPrice = value;
  }

  fetchCartList() {
    this.cartSrv.getCartList().then((res) => {
      console.log('RETURN MY CART', res);
      res.forEach((element) => {
        const localSubTotalPrice = element?.quantity * +element?.product?.primary_price;
        Object.assign(element, { local_subtotal_price: localSubTotalPrice });
      });
      this.cartList = res;
      this.initTotalPrice();
    });
  }

  fetchRelatedProductList() {
    this.productSrv.getFeaturedProduct(null, null).then((res) => {
      this.relatedProductList = res;
    });
  }
}
