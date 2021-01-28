import { Component, OnInit } from '@angular/core';
import { CartService } from '@shared/services/modules/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartList: any[] = null;
  totalPrice = 0;

  constructor(private cartSrv: CartService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.fetchCartList();
  }

  initTotalPrice() {
    this.cartSrv.calculateSumPrice(this.cartList).then((res) => {
      this.totalPrice = res;
      console.log('this.totalPrice : ', this.totalPrice);
    });
  }

  updateTotalPrice(value) {
    this.totalPrice = value;
  }

  fetchCartList() {
    this.cartSrv.getCartList().then((res) => {
      res.forEach((element) => {
        const localSubTotalPrice = element?.quantity * +element?.product?.primary_price;
        Object.assign(element, { local_subtotal_price: localSubTotalPrice });
      });
      this.cartList = res;
      this.initTotalPrice();
    });
  }
}
