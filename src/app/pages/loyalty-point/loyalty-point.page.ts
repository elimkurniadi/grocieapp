import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Voucher } from '@shared/models';
import { ToastService } from '@shared/services';
import { UserService, VoucherService } from '@shared/services/modules';

@Component({
  selector: 'app-loyalty-point',
  templateUrl: './loyalty-point.page.html',
  styleUrls: ['./loyalty-point.page.scss'],
})
export class LoyaltyPointPage implements OnInit {
  point: any;
  vouchers: Voucher[];
  fetching = false;

  constructor(
    private router: Router,
    private userSrv: UserService,
    private voucherSrv: VoucherService,
    private toastSrv: ToastService
  ) {}

  ngOnInit() {
    this.getPoint();
    this.getVoucher();
  }

  getPoint() {
    this.userSrv
      .getProfile()
      .then((res) => {
        this.point = res.loyalty_point;
      })
      .catch(() => {
        this.point = null;
      });
  }

  getVoucher() {
    this.fetching = true;

    this.voucherSrv
      .getListLoyalty()
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

  goToHistory() {
    this.router.navigate(['/loyalty-point', 'history']);
  }
}
