import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { PaymentMethod, PaymentSummary, Response } from '@shared/models';
import { CacheService, GlobalService, ToastService } from '@shared/services';
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
  shippingDate: string;
  shippingTime: string;
  paymentSummary: PaymentSummary;
  paymentMethods: PaymentMethod[];
  isOnFetch = false;
  backButton: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionSrv: TransactionService,
    private checkoutSrv: CheckoutService,
    private browserSrv: BrowserService,
    private toastSrv: ToastService,
    private cache: CacheService,
    private gs: GlobalService,
    private platform: Platform,
    private navCtrl: NavController
  ) {
    this.route.queryParams.subscribe((param) => {
      this.isNow = param.is_now === 'true';
      this.addressId = param.address_id;
      this.notes = param.notes;
      this.voucherCode = param.voucher_code;
      this.shippingDate = param.date;
      this.shippingTime = param.time;

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

  ionViewDidEnter() {
    this.observeFetchState();

    this.backButton = this.platform.backButton.subscribeWithPriority(20, () => {
      this.goBack();
    });
  }

  ionViewDidLeave() {
    this.backButton.unsubscribe();
  }

  goBack() {
    this.navCtrl.navigateBack(this.previousUrl);
  }

  observeFetchState() {
    this.gs.observeOnFetch().subscribe((value: boolean) => {
      this.isOnFetch = value;
    });
  }
  next() {
    const queryParams = {
      address_id: this.addressId,
      is_now: this.isNow,
      notes: this.notes,
      payment_id: this.paymentMethod,
      date: this.shippingDate,
      time: this.shippingTime,
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
    const filter = {
      is_now: this.isNow,
      address_id: this.addressId,
    };

    if (this.voucherCode !== '' || this.voucherCode !== null) {
      filter['voucher_code'] = this.voucherCode;
    }

    if (!this.isNow) {
      filter['delivery_date'] = this.shippingDate;
    }

    this.checkoutSrv.calculatePrice(filter).then((res: Response) => {
      const result = res.response as PaymentSummary;
      this.paymentSummary = result;
    });
  }

  payOrder() {
    const body = this.prepareBodyTransaction();

    this.transactionSrv
      .add(body)
      .then((res) => {
        this.removeVoucher();
        this.browserSrv.openBrowser({ url: res.response });
        this.navCtrl.navigateBack('my-order');
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  prepareBodyTransaction() {
    const body = {
      is_now: this.isNow,
      address_id: this.addressId,
      shipping_id: 1,
      payment_method_id: this.paymentMethod,
    };

    if (this.notes !== null && this.notes !== '' && this.notes !== undefined) {
      body['notes'] = this.notes;
    }

    if (!this.isNow) {
      body['shipping_date'] = this.shippingDate;
      body['shipping_time'] = this.shippingTime;
    }

    if (this.voucherCode !== null && this.voucherCode !== '' && this.voucherCode !== undefined) {
      body['voucher_code'] = this.voucherCode;
    }

    return body;
  }

  removeVoucher() {
    this.cache.removeVoucher();
  }
}
