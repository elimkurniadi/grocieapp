import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '@shared/models';
import { CartService, TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.component.html',
  styleUrls: ['./my-order-detail.component.scss'],
})
export class MyOrderDetailComponent implements OnInit {
  itemList: Cart[];
  totalPrice = 0;
  order;
  transactionStatus;
  orderId: any;
  // order = {
  //   transaction_id: 'AHS - 70009876543',
  //   transaction_status: 'in_process',
  //   transaction_status_name: 'Order In Process',
  //   created_at: new Date(),
  //   order_payment_method: 'Manual Bank Transfer',
  //   total_price: '70000',
  // };

  constructor(
    private cartSrv: CartService,
    private transactionSrv: TransactionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.fetchCartList();
    this.observeParam();
  }

  observeParam() {
    this.activatedRoute.params.subscribe((param) => {
      this.orderId = param?.id;
      // this.productId = id;
      this.fetchTransactionDetail();
      this.fetchTransactionStatus();
    });
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

  fetchTransactionDetail() {
    this.transactionSrv.getTransactionDetail(this.orderId).then((data) => {
      this.order = data;
    });
  }

  fetchTransactionStatus() {
    this.transactionSrv.getTransactionStatus(this.orderId).then((data) => {
      this.transactionStatus = data;
    });
  }

  uploadProof() {
    this.router.navigate(['/payment', this.orderId, 'proof']);
  }
}
