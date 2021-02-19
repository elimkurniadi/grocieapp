import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserService } from '@shared/services/browser.service';
import { AddressService, TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit {
  paymentMethod: string;
  address: any;

  constructor(
    private router: Router,
    private transactionSrv: TransactionService,
    private addressSrv: AddressService,
    private browserSrv: BrowserService
  ) {}

  ngOnInit() {
    this.getAddress();
  }

  next() {
    if (this.paymentMethod === 'online_bank') {
      this.payOrder();
    } else if (this.paymentMethod === 'cod') {
      this.router.navigate(['/payment', 'cod']);
    }
  }

  getAddress() {
    this.addressSrv.getAddress().then((res) => {
      this.address = res[0];
    });
  }

  payOrder() {
    const body = {
      is_now: true,
      address_id: this.address.address_id,
      shipping_id: 1,
      payment_method_id: 1,
    };

    this.transactionSrv.add(body).then((res) => {
      this.browserSrv.openBrowser({ url: res.response });
    });
  }
}
