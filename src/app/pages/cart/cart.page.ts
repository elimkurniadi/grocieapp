import { Component, OnInit } from '@angular/core';
import { CartService } from '@shared/services/modules/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartList = [
    {
      product: {
        product_thumbnail: 'https://via.placeholder.com/200.png',
        product_price: 18000,
        product_unit: 'kg',
        product_title: 'Wortel Merah',
        product_description: 'Wombo ahoy',
      },
      price: null,
      quantity: 1,
    },
    {
      product: {
        product_thumbnail: 'https://via.placeholder.com/200.png',
        product_price: 20000,
        product_unit: 'kg',
        product_title: 'Wortel Merah Premium',
        product_description: 'Wombo ahoy Premium super top',
      },
      price: null,
      quantity: 2,
    },
  ];
  totalPrice = 0;

  constructor(private cartSrv: CartService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.initTotalPrice();
  }

  initTotalPrice() {
    this.cartSrv.calculateSumPrice(this.cartList).then((res) => {
      this.totalPrice = res;
    });
  }

  updateTotalPrice(value) {
    this.totalPrice = value;
  }
}
