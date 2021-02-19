import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { SharedModule } from '@shared/shared.module';
import { PaymentCodComponent } from './payment-cod/payment-cod.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PaymentPageRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [PaymentPage, PaymentListComponent, PaymentCodComponent],
})
export class PaymentPageModule {}
