import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voucher } from '@shared/models';
import { CacheService } from '@shared/services';

@Component({
  selector: 'app-card-voucher',
  templateUrl: './card-voucher.component.html',
  styleUrls: ['./card-voucher.component.scss'],
})
export class CardVoucherComponent implements OnInit {
  @Input() voucher: Voucher;

  constructor(private router: Router, private cache: CacheService) {}

  ngOnInit() {}

  useVoucher(voucherId: string) {
    this.cache.setVoucher(voucherId);
    this.router.navigate(['/checkout'], { queryParams: { voucher_id: voucherId } });
  }
}
