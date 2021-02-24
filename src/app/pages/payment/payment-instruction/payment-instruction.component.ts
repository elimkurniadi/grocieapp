import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentSummary, Response } from '@shared/models';
import { ToastService } from '@shared/services';
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
  paymentSummary: PaymentSummary;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private checkoutSrv: CheckoutService,
    private transactionSrv: TransactionService,
    private toastSrv: ToastService
  ) {
    this.route.queryParams.subscribe((param) => {
      this.isNow = param.is_now;
      this.addressId = param.address_id;
      this.notes = param.notes;
      this.voucherCode = param.voucher_code;
      this.paymentId = param.payment_id;

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

  pay() {
    const body = {
      is_now: this.isNow,
      address_id: this.addressId,
      shipping_id: 1,
      payment_method_id: this.paymentId,
    };

    if (this.notes !== null && this.notes !== '') {
      body['notes'] = this.notes;
    }

    this.transactionSrv
      .add(body)
      .then((res) => {
        console.log('paid', res);
        this.router.navigate(['/payment', 'proof']);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
}
