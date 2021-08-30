import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherPageRoutingModule } from './voucher-routing.module';

import { VoucherPage } from './voucher.page';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { SharedModule } from '@shared/shared.module';
import { CardModule } from '@shared/common/cards/card.module';
import { VoucherBuySuccessComponent } from './voucher-buy-success/voucher-buy-success.component';
import { VoucherSkeletonComponent } from './voucher-skeleton/voucher-skeleton.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VoucherPageRoutingModule, SharedModule, CardModule],
  declarations: [
    VoucherPage,
    VoucherListComponent,
    VoucherDetailComponent,
    VoucherBuySuccessComponent,
    VoucherSkeletonComponent,
  ],
})
export class VoucherPageModule {}
