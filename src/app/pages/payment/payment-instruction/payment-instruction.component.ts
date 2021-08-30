import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { PaymentSummary, Response } from '@shared/models';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { CacheService, GlobalService, ToastService } from '@shared/services';
import { AlertService } from '@shared/services/alert.service';
import { CheckoutService, TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-payment-instruction',
  templateUrl: './payment-instruction.component.html',
  styleUrls: ['./payment-instruction.component.scss'],
})
export class PaymentInstructionComponent implements OnInit {
  previousUrl = '/payment/list';
  addressId: any;
  isNow: boolean;
  notes: string;
  voucherCode: string;
  paymentId: any;
  shippingDate: string;
  shippingTime: string;
  paymentSummary: PaymentSummary;
  isOnFetch = false;

  backButton: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private checkoutSrv: CheckoutService,
    private transactionSrv: TransactionService,
    private toastSrv: ToastService,
    private cache: CacheService,
    private gs: GlobalService,
    private translate: TranslateService,
    private alertSrv: AlertService,
    private navCtrl: NavController,
    private platform: Platform
  ) {
    this.route.queryParams.subscribe((param) => {
      this.isNow = param.is_now === 'true';
      this.addressId = param.address_id;
      this.notes = param.notes;
      this.voucherCode = param.voucher_code;
      this.paymentId = param.payment_id;
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

  pay() {
    const body = this.prepareBodyTransaction();

    this.transactionSrv
      .add(body)
      .then((res) => {
        this.removeVoucher();
        this.router.navigate(['/payment', res.response, 'proof']);
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
      payment_method_id: this.paymentId,
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
