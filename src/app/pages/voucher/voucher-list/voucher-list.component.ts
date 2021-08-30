import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page, Response, ResponsePagination, Voucher } from '@shared/models';
import { GlobalService, ToastService } from '@shared/services';
import { VoucherService } from '@shared/services/modules';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss'],
})
export class VoucherListComponent implements OnInit {
  vouchers: Voucher[];
  voucherCount: number;
  voucherType: string;
  redirectBackUrl: string;
  fetching = false;

  code: string;

  page: Page;

  constructor(
    private voucherSrv: VoucherService,
    private toastSrv: ToastService,
    private route: ActivatedRoute,
    private gs: GlobalService
  ) {
    this.observeQueryParam();
    this.page = {
      row: 10,
      page: 1,
    };
  }
  observeQueryParam() {
    this.route.queryParams.subscribe((param) => {
      if (param?.type === 'point') {
        this.voucherType = 'buy';
        this.redirectBackUrl = '/loyalty-point';
      } else {
        this.voucherType = 'redeem';
        this.redirectBackUrl = '/checkout';
      }
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.fetching = true;
    if (this.voucherType === 'buy') {
      this.getVoucherLoyalty();
    } else {
      this.getVoucher();
    }
  }

  getVoucher() {
    this.voucherSrv
      .getList(this.page)
      .then((res: Response) => {
        const vouchers = res.response as Voucher[];
        // this.voucherCount = res.response.count;
        if (this.vouchers && this.vouchers.length) {
          this.vouchers.concat(vouchers);
        } else {
          this.vouchers = vouchers;
        }

        this.fetching = false;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
        this.fetching = false;
      });
  }
  getVoucherLoyalty() {
    this.voucherSrv
      .getListLoyalty(this.page)
      .then((res: Response) => {
        const vouchers = res.response as Voucher[];

        if (this.vouchers && this.vouchers.length) {
          this.vouchers.concat(vouchers);
        } else {
          this.vouchers = vouchers;
        }

        this.fetching = false;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
        this.fetching = false;
      });
  }

  searchVoucher(event: any) {
    const value = event.detail.value;
    this.code = value;

    if (this.code && this.code !== '') {
      this.getVoucherByCode();
    } else {
      this.vouchers = [];
      this.page = {
        row: 10,
        page: 1,
      };

      this.fetchData();
    }
  }

  getVoucherByCode() {
    this.fetching = true;

    this.voucherSrv
      .getListByCode(this.code)
      .then((res: Response) => {
        const vouchers = res.response as Voucher[];
        this.vouchers = vouchers;

        this.fetching = false;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
        this.fetching = false;
      });
  }

  loadMoreVoucher(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.page.page += 1;

      if (this.page.page >= Math.ceil(this.voucherCount / this.page.row)) {
        event.target.disabled = true;
      } else {
        this.fetchData();
      }
    }, 500);
  }
}
