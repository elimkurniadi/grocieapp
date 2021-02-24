import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod, PaymentSummary, Response } from '@shared/models';
import { ToastService } from '@shared/services';
import { BrowserService } from '@shared/services/browser.service';
import { CheckoutService, TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit {
  routerEvents: any;
  previousUrl = '/checkout';
  paymentMethod: any;
  addressId: any;
  isNow: boolean;
  notes: string;
  voucherCode: string;
  paymentSummary: PaymentSummary;
  paymentMethods: PaymentMethod[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionSrv: TransactionService,
    private checkoutSrv: CheckoutService,
    private browserSrv: BrowserService,
    private toastSrv: ToastService
  ) {
    this.route.queryParams.subscribe((param) => {
      this.isNow = param.is_now;
      this.addressId = param.address_id;
      this.notes = param.notes;
      this.voucherCode = param.voucher_code;

      const params = new URLSearchParams();
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          params.set(key, param[key]);
        }
      }
      this.previousUrl += `?${params.toString()}`;
    });
  }

  ngOnInit() {
    this.getPriceSummary();
    this.getPaymentMethod();
  }

  next() {
    const queryParams = {
      address_id: this.addressId,
      is_now: this.isNow,
      notes: this.notes,
      payment_id: this.paymentMethod,
    };

    if (this.voucherCode !== '' && this.voucherCode !== null) {
      queryParams['voucher_code'] = this.voucherCode;
    }

    if (this.paymentMethod === 1) {
      // if virtual account
      this.payOrder();
    } else if (this.paymentMethod === 2) {
      // if bank transfer
      this.router.navigate(['/payment', 'instruction'], { queryParams });
    } else if (this.paymentMethod === 3) {
      // if cod
      this.router.navigate(['/payment', 'cod'], { queryParams });
    }
  }

  getPaymentMethod() {
    this.transactionSrv
      .getPaymentMethod()
      .then((res) => {
        const paymentMethods = res.response as PaymentMethod[];
        this.paymentMethods = paymentMethods;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  getPriceSummary() {
    const filter = {};
    if (this.voucherCode !== '' || this.voucherCode !== null) {
      filter['voucher_code'] = this.voucherCode;
    }

    this.checkoutSrv.calculatePrice(filter).then((res: Response) => {
      const result = res.response as PaymentSummary;
      this.paymentSummary = result;
    });
  }

  payOrder() {
    const body = {
      is_now: this.isNow,
      address_id: this.addressId,
      shipping_id: 1,
      payment_method_id: this.paymentMethod,
    };

    if (this.notes !== null && this.notes !== '') {
      body['notes'] = this.notes;
    }

    this.transactionSrv.add(body).then((res) => {
      this.browserSrv.openBrowser({ url: res.response });
    });
  }
}
