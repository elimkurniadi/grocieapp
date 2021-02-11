import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response, Voucher } from '@shared/models';
import { CacheService, ToastService } from '@shared/services';
import { VoucherService } from '@shared/services/modules';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss'],
})
export class VoucherDetailComponent implements OnInit {
  id: string;
  voucher: Voucher;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voucherSrv: VoucherService,
    private toastSrv: ToastService,
    private cache: CacheService
  ) {
    this.route.params.subscribe((param) => {
      if (param.id !== null) {
        this.id = param.id;
      }
    });
  }

  ngOnInit() {
    this.getVoucher();
  }

  getVoucher() {
    this.voucherSrv
      .getDetail(this.id)
      .then((res: Response) => {
        const voucher = res.response as Voucher;

        this.voucher = voucher;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  useVoucher() {
    this.cache.setVoucher(this.voucher.voucher_id);
    this.router.navigate(['/checkout']);
  }
}
