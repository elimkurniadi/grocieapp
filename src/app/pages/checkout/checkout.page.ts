import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, PaymentSummary, Response, Voucher } from '@shared/models';
import { CacheService, ToastService } from '@shared/services';
import { AddressService, CartService, CheckoutService, VoucherService } from '@shared/services/modules';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  defaultAddress;
  cartList: Cart[];
  totalPrice = 0;
  paymentSummary: PaymentSummary;
  currDate: any = moment(new Date());
  maxCurrDate: any = moment(new Date()).set({ hour: 18, minute: 0 });
  selectedDate = null;
  canDeliverNow: boolean;
  deliveryNow: boolean;
  notes: string;

  timeList = [
    {
      time: '10:00 - 12:00',
      selected: false,
    },
    {
      time: '12:00 - 14:00',
      selected: false,
    },
    {
      time: '14:00 - 16:00',
      selected: false,
    },
    {
      time: '16:00 - 18:00',
      selected: false,
    },
  ];

  voucher: Voucher;

  constructor(
    private cartSrv: CartService,
    private voucherSrv: VoucherService,
    private toastSrv: ToastService,
    private cache: CacheService,
    private route: ActivatedRoute,
    private addressSrv: AddressService,
    private checkoutSrv: CheckoutService,
    private router: Router
  ) {
    this.observeQueryParam();
  }

  ngOnInit() {
    this.canDeliverNow = true;
    this.deliveryNow = true;

    this.fetchCartList();
    if (this.currDate > this.maxCurrDate) {
      // this.canDeliverNow = false;
      this.deliveryNow = false;
      const currDate = this.currDate.add(1, 'days').format('YYYY-MM-DD');
      this.currDate = currDate;
    }
  }

  observeQueryParam() {
    this.route.queryParams.subscribe((param) => {
      this.getVoucher();
      if (param.address_id) {
        // FETCH ADDRESS DETAIL HERE
        this.addressSrv.getAddress(param?.address_id).then((address) => {
          this.defaultAddress = address;
        });
      } else {
        this.fetchAddressList();
      }
    });
  }

  ionViewDidEnter() {}

  onDateSelect(value) {
    this.selectedDate = moment(value).format('YYYY-MM-DD');
  }

  onTimeSelect(idx) {
    const list = this.timeList;
    list.forEach((element, index) => {
      if (index === idx) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
  }

  fetchCartList() {
    this.cartSrv.getCartList().then((res) => {
      res.forEach((element) => {
        const localSubTotalPrice = element?.quantity * +element?.product?.primary_price;
        Object.assign(element, { local_subtotal_price: localSubTotalPrice });
      });
      this.cartList = res;
    });
  }

  fetchAddressList() {
    this.addressSrv.getAddress().then((res) => {
      this.defaultAddress = res[0];
    });
  }

  getPriceSummary() {
    const filter = {};
    if (this.voucher && (this.voucher?.voucher_code !== '' || this.voucher?.voucher_code !== null)) {
      filter['voucher_code'] = this.voucher.voucher_code;
    }

    this.checkoutSrv.calculatePrice(filter).then((res: Response) => {
      const result = res.response as PaymentSummary;
      this.paymentSummary = result;
    });
  }

  getVoucher() {
    this.cache.getVoucher().then(async (voucherId) => {
      if (voucherId !== null && voucherId !== '') {
        await this.voucherSrv
          .getDetail(voucherId)
          .then((res: Response) => {
            const voucher = res.response as Voucher;

            this.voucher = voucher;
          })
          .catch((err) => {
            const error = err.error.error;
            this.toastSrv.show(error.message);
          });
      }

      this.getPriceSummary();
    });
  }

  removeVoucher() {
    this.cache.removeVoucher();
  }

  radioChanged(value: any) {
    this.deliveryNow = value === 'deliver_now';
  }
  pay() {
    const queryParams = { address_id: this.defaultAddress.address_id, is_now: this.deliveryNow, notes: this.notes };
    if (this.voucher && this.voucher.quota > 0) {
      queryParams['voucher_code'] = this.voucher.voucher_code;
    }

    this.router.navigate(['/payment'], {
      queryParams,
    });
  }
}
