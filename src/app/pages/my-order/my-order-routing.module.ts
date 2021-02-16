import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrderDetailComponent } from './my-order-detail/my-order-detail.component';
import { MyOrderListComponent } from './my-order-list/my-order-list.component';

import { MyOrderPage } from './my-order.page';

const routes: Routes = [
  {
    path: '',
    component: MyOrderPage,
    children: [
      {
        path: 'list',
        component: MyOrderListComponent,
      },
      {
        path: ':id/detail',
        component: MyOrderDetailComponent,
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
export class MyOrderPageRoutingModule {}
