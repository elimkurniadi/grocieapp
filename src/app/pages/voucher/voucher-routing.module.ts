import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';

import { VoucherPage } from './voucher.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherPage,
    children: [
      {
        path: 'list',
        component: VoucherListComponent,
      },
      {
        path: ':id/detail',
        component: VoucherDetailComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherPageRoutingModule {}
