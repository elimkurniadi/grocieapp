import { Component, OnInit } from '@angular/core';
import { Page, Response, ResponsePagination, Voucher } from '@shared/models';
import { ToastService } from '@shared/services';
import { VoucherService } from '@shared/services/modules';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss'],
})
export class VoucherListComponent implements OnInit {
  vouchers: Voucher[];
  voucherCount: number;
  code: string;

  page: Page;

  constructor(private voucherSrv: VoucherService, private toastSrv: ToastService) {
    this.page = {
      row: 10,
      page: 1,
    };
  }

  ngOnInit() {
    this.getVoucher();
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
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
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

      this.getVoucher();
    }
  }

  getVoucherByCode() {
    this.voucherSrv
      .getListByCode(this.code)
      .then((res: Response) => {
        const vouchers = res.response as Voucher[];
        this.vouchers = vouchers;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  loadMoreVoucher(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.page.page += 1;

      if (this.page.page >= Math.ceil(this.voucherCount / this.page.row)) {
        event.target.disabled = true;
      } else {
        this.getVoucher();
      }
    }, 500);
  }
}
