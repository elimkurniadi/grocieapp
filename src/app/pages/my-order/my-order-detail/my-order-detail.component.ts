import { Component, OnInit } from '@angular/core';
import { Cart } from '@shared/models';
import { CartService } from '@shared/services/modules';

@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.component.html',
  styleUrls: ['./my-order-detail.component.scss'],
})
export class MyOrderDetailComponent implements OnInit {
  itemList: Cart[];
  totalPrice = 0;

  order = {
    order_id: 'AHS - 70009876543',
    order_status: 'in_process',
    order_status_name: 'Order In Process',
    order_date: new Date(),
    order_payment_method: 'Manual Bank Transfer',
    total_payment: '70000',
  };

  constructor(private cartSrv: CartService) {}

  ngOnInit() {
    this.fetchCartList();
  }

  fetchCartList() {
    this.cartSrv.getCartList().then((res) => {
      res.forEach((element) => {
        const localSubTotalPrice = element?.quantity * +element?.product?.primary_price;
        Object.assign(element, { local_subtotal_price: localSubTotalPrice });
      });
      this.itemList = res;
      this.initTotalPrice();
    });
  }

  initTotalPrice() {
    this.cartSrv.calculateSumPrice(this.itemList).then((res) => {
      this.totalPrice = res;
    });
  }
}
