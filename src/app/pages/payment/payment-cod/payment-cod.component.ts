import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { PaymentSummary, Response } from '@shared/models';
import { CacheService, GlobalService, RxValidatorService, ToastService } from '@shared/services';
import { CheckoutService, TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-payment-cod',
  templateUrl: './payment-cod.component.html',
  styleUrls: ['./payment-cod.component.scss'],
})
export class PaymentCodComponent implements OnInit {
  fg: FormGroup;
  previousUrl = '/payment/list';
  addressId: any;
  isNow: boolean;
  notes: string;
  voucherCode: string;
  paymentId: any;
  shippingDate: string;
  shippingTime: string;
  paymentSummary: PaymentSummary;
  amountCod: any;
  isOnFetch = false;

  backButton: any;

  constructor(
    private validatorSrv: RxValidatorService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private checkoutSrv: CheckoutService,
    private transactionSrv: TransactionService,
    private toastSrv: ToastService,
    private gs: GlobalService,
    private cache: CacheService,
    private platform: Platform,
    private navCtrl: NavController
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
    this.buildCodForm();
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

  buildCodForm() {
    this.validatorSrv.validatorErrorMessage();

    this.fg = this.fb.group({
      amount: [null, [RxwebValidators.required()]],
      cod_payment_amount: [null, [RxwebValidators.required()]],
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

  amountChanged(event: any) {
    const value = event.replace(/,/g, '');
    const formattedNumber = this.gs.numberWithCommas(value);
    this.amountCod = formattedNumber;

    this.fg.patchValue({ cod_payment_amount: value, amount: formattedNumber });
  }

  pay() {
    if (this.fg.valid) {
      const body = this.prepareBodyTransaction();
      this.transactionSrv
        .add(body)
        .then((res) => {
          this.removeVoucher();
          this.navCtrl.navigateBack('my-order');
        })
        .catch((err) => {
          const error = err.error.error;
          this.toastSrv.show(error.message);
        });
    } else {
      this.gs.markDirtyForm(this.fg);
    }
  }

  prepareBodyTransaction() {
    const body = {
      is_now: this.isNow,
      address_id: this.addressId,
      shipping_id: 1,
      payment_method_id: this.paymentId,
      cod_payment_amount: this.fg.value.cod_payment_amount,
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
