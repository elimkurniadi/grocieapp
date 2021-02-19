import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentCodComponent } from './payment-cod/payment-cod.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

import { PaymentPage } from './payment.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage,
    children: [
      {
        path: 'list',
        component: PaymentListComponent,
      },
      {
        path: 'cod',
        component: PaymentCodComponent,
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
export class PaymentPageRoutingModule {}
