import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { PopoverInfoComponent } from '@shared/common/popover/popover-info/popover-info.component';
import { Address, Cart, DeliveryTime, PaymentSummary, Response, Voucher } from '@shared/models';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { CacheService, GlobalService, ToastService } from '@shared/services';
import { AddressService, CartService, CheckoutService, SettingService, VoucherService } from '@shared/services/modules';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  defaultAddress: Address;
  cartList: Cart[];
  totalPrice = 0;
  paymentSummary: PaymentSummary;
  currDate: any = moment(new Date()).tz(this.gs.timezoneName);
  maxCurrDate: any = moment(new Date()).tz(this.gs.timezoneName).set({ hour: 18, minute: 0 });
  selectedDate = null;
  deliveryDate: any;
  operationalTime;
  canDeliverNow: boolean;
  deliveryNow: boolean;
  notes: string;

  timeList: DeliveryTime[];

  voucher: Voucher;
  voucherError = null;

  isOnFetch = false;
  backButton: any;

  constructor(
    private cartSrv: CartService,
    private voucherSrv: VoucherService,
    private toastSrv: ToastService,
    private cache: CacheService,
    private route: ActivatedRoute,
    private addressSrv: AddressService,
    private checkoutSrv: CheckoutService,
    private settingSrv: SettingService,
    private router: Router,
    private translate: TranslateService,
    private gs: GlobalService,
    private popoverCtrl: PopoverController,
    private platform: Platform,
    private navCtrl: NavController
  ) {
    this.observeQueryParam();
  }

  ngOnInit() {
    this.cache.removeVoucher();
    this.fetchCartList();

    this.checkOperationalTime();
    this.getDeliveryTime();
  }

  observeQueryParam() {
    this.route.queryParams.subscribe((param) => {
      if (param?.voucher_id) {
        this.getVoucher();
      } else {
        this.cache.removeVoucher();
      }

      if (param?.address_id) {
        // FETCH ADDRESS DETAIL HERE
        this.addressSrv.getAddress(param?.address_id).then((address) => {
          this.defaultAddress = address;
          if (this.voucher !== null) {
            this.getVoucher();
          } else {
            this.getPriceSummary();
          }
        });
      } else {
        this.fetchAddressList();
      }
    });
  }

  ionViewDidEnter() {
    this.observeFetchState();

    this.backButton = this.platform.backButton.subscribeWithPriority(15, () => {
      this.navCtrl.pop();
    });
  }

  ionViewDidLeave() {
    this.backButton.unsubscribe();
  }

  observeFetchState() {
    this.gs.observeOnFetch().subscribe((value: boolean) => {
      this.isOnFetch = value;
    });
  }

  onDateSelect(value) {
    this.selectedDate = moment(value).tz(this.gs.timezoneName).format('YYYY-MM-DD');
    this.getPriceSummary();

    this.getDeliveryTime();
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

      if (this.voucher !== null) {
        this.getVoucher();
      } else {
        this.getPriceSummary();
      }
    });
  }

  getPriceSummary() {
    const filter = {
      is_now: this.deliveryNow,
      address_id: this.defaultAddress.address_id,
      delivery_date: moment(this.selectedDate).tz(this.gs.timezoneName).format('YYYY-MM-DD'),
    };

    if (this.voucher && (this.voucher?.voucher_code !== '' || this.voucher?.voucher_code !== null)) {
      filter['voucher_code'] = this.voucher.voucher_code;
    }

    this.checkoutSrv.calculatePrice(filter).then((res: Response) => {
      const result = res.response as PaymentSummary;
      if (this.paymentSummary && result?.delivery_fee !== this.paymentSummary?.delivery_fee) {
        this.toastSrv.show(this.translate.get('DELIVERY_UPDATED'));
      } else if (this.paymentSummary && result?.discount !== this.paymentSummary?.discount) {
        if (result?.discount > 0) this.toastSrv.show(this.translate.get('VOUCHER_APPLIED'));
        else this.toastSrv.show(this.translate.get('VOUCHER_REMOVED'));
      }
      this.paymentSummary = result;
      this.voucherError = result.voucher_error;
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

            this.showAlertVoucherLimit();
          })
          .catch((err) => {
            const error = err.error.error;
            this.toastSrv.show(error.message);
          });
      }

      this.getPriceSummary();
    });
  }

  checkOperationalTime() {
    this.settingSrv
      .checkOperationalTime()
      .then((res) => {
        const response = res.response;
        this.operationalTime = response;
        const closeHour = parseInt(response.close.split(':')[0], 10);
        this.maxCurrDate = moment(new Date()).tz(this.gs.timezoneName).set({ hour: closeHour, minute: 0 });

        this.canDeliverNow = response.is_open;
        this.deliveryNow = response.is_open;
        this.setDefaultDate();
      })
      .catch((err) => {
        this.gs.log(err);
      });
  }

  setDefaultDate() {
    this.selectedDate = moment(new Date()).tz(this.gs.timezoneName).format();
    if (!this.canDeliverNow) {
      const currDate = this.currDate.add(1, 'days').format('YYYY-MM-DD');
      this.currDate = currDate;
      this.selectedDate = moment(new Date()).tz(this.gs.timezoneName).add(1, 'days').format();
    } else {
      const currDate = this.currDate.format('YYYY-MM-DD');
      this.currDate = currDate;
    }
  }

  showAlertVoucherLimit() {
    if (this.voucher.quota < 0) {
      const errMsg = this.translate.get('VOUCHER_LIMIT');
      this.toastSrv.show(errMsg);
    }
  }

  removeVoucher() {
    this.voucher = null;
    this.cache.removeVoucher();
    this.getPriceSummary();
  }

  getDeliveryTime() {
    const params = {
      date: moment(this.selectedDate).tz(this.gs.timezoneName).format('YYYY-MM-DD'),
    };

    if (this.timeList) {
      this.timeList.forEach((time) => {
        time.active = false;
      });
    }

    this.settingSrv
      .getDeliveryTime(params)
      .then((res: Response) => {
        const times = res.response as DeliveryTime[];
        times.forEach((time) => {
          time.selected = false;
        });

        this.timeList = times;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  radioChanged(value: any) {
    this.deliveryNow = value === 'deliver_now';
    this.getPriceSummary();

    if (!this.deliveryNow) {
      this.getDeliveryTime();
    }
  }
  pay() {
    const timeSelected = this.timeList.filter((time) => {
      return time.selected;
    });

    if (!this.deliveryNow && !timeSelected.length) {
      const errMsg = this.translate.get('SELECT_TIME_FIRST');
      this.toastSrv.show(errMsg);
    } else {
      const queryParams = { address_id: this.defaultAddress.address_id, is_now: this.deliveryNow, notes: this.notes };
      if (this.voucher && this.voucher.quota > 0) {
        queryParams['voucher_code'] = this.voucher.voucher_code;
      }

      if (!this.deliveryNow) {
        queryParams['date'] = moment(this.selectedDate).tz(this.gs.timezoneName).format('YYYY-MM-DD');
        queryParams['time'] = timeSelected[0].text;
      }

      this.router.navigate(['/payment'], {
        queryParams,
      });
    }
  }

  async presentDeliveryInfo(type: string) {
    const message =
      type === 'now' ? this.translate.get('DELIVERY_NOW_INFO') : this.translate.get('DELIVERY_LATER_INFO');
    const popover = await this.popoverCtrl.create({
      component: PopoverInfoComponent,
      cssClass: 'popover-info',
      componentProps: {
        message,
      },
      // translucent: true,
    });
    await popover.present();

    // const { role } = await popover.onDidDismiss();
  }
}
