import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '@shared/services';
import { CartService, ProductService } from '@shared/services/modules';
import * as _ from 'lodash';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartList: any[] = null;
  unprocessableCartList: any[] = [];
  relatedProductList: any[] = null;
  totalPrice = 0;
  fetching = false;

  constructor(
    private cartSrv: CartService,
    private productSrv: ProductService,
    private router: Router,
    private gs: GlobalService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
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
    this.fetching = true;
    this.cartSrv.getCartList().then((res) => {
      res.forEach((element) => {
        const localSubTotalPrice = element?.quantity * +element?.product?.primary_price;
        Object.assign(element, { local_subtotal_price: localSubTotalPrice });
      });
      this.cartList = res;
      this.partitionCartList(this.cartList);

      this.fetching = false;
    });
  }

  fetchRelatedProductList() {
    this.productSrv.getFeaturedProduct(null, null).then((res) => {
      this.relatedProductList = res;
    });
  }

  partitionCartList(list) {
    const divide = _.partition(list, (x) => {
      return x.quantity <= x.product.stock;
    });
    this.cartList = divide[0];

    this.unprocessableCartList = divide[1];
    this.initTotalPrice();
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
