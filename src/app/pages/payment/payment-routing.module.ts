import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentCodComponent } from './payment-cod/payment-cod.component';
import { PaymentInstructionComponent } from './payment-instruction/payment-instruction.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentProofComponent } from './payment-proof/payment-proof.component';

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
        path: 'instruction',
        component: PaymentInstructionComponent,
      },
      {
        path: ':id/proof',
        component: PaymentProofComponent,
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
