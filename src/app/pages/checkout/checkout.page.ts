import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Response, Voucher } from '@shared/models';
import { CacheService, ToastService } from '@shared/services';
import { CartService, VoucherService } from '@shared/services/modules';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartList: Cart[];
  totalPrice = 0;
  currDate = moment(new Date()).format('YYYY-MM-DD');
  selectedDate = null;
  timeList = [
    {
      time: '10:00 - 12:00',
      selected: false,
    },
    {
      time: '10:00 - 12:00',
      selected: false,
    },
    {
      time: '10:00 - 12:00',
      selected: false,
    },
    {
      time: '10:00 - 12:00',
      selected: false,
    },
  ];

  voucher: Voucher;

  constructor(
    private cartSrv: CartService,
    private voucherSrv: VoucherService,
    private toastSrv: ToastService,
    private cache: CacheService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((param) => {
      this.getVoucher();
    });
  }

  ngOnInit() {
    this.fetchCartList();
  }

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
      this.initTotalPrice();
    });
  }

  initTotalPrice() {
    this.cartSrv.calculateSumPrice(this.cartList).then((res) => {
      this.totalPrice = res;
    });
  }

  getVoucher() {
    this.cache.getVoucher().then((voucherId) => {
      if (voucherId !== null && voucherId !== '') {
        this.voucherSrv
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
    });
  }
}
