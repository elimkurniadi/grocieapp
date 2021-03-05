import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, Transaction } from '@shared/models';
import { GlobalService } from '@shared/services';
import { BrowserService } from '@shared/services/browser.service';
import { CartService, TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.component.html',
  styleUrls: ['./my-order-detail.component.scss'],
})
export class MyOrderDetailComponent implements OnInit {
  itemList: Cart[];
  totalPrice = 0;
  order: Transaction;
  transactionStatus;
  orderId: any;
  isOnFetch = false;

  constructor(
    private cartSrv: CartService,
    private transactionSrv: TransactionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private browserSrv: BrowserService,
    private gs: GlobalService
  ) {}

  ngOnInit() {
    // this.fetchCartList();
    this.observeParam();
  }

  ionViewDidEnter() {
    this.observeFetchState();
  }

  observeFetchState() {
    this.gs.observeOnFetch().subscribe((value: boolean) => {
      this.isOnFetch = value;
    });
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

  pay() {
    this.browserSrv.openBrowser({ url: this.order.payment_url });
  }
}
