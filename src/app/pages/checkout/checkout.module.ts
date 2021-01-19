import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { SharedModule } from '@shared/shared.module';
import { ItemListModule } from '@shared/common/item-list/item-list.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CheckoutPageRoutingModule, SharedModule, ItemListModule],
  declarations: [CheckoutPage],
})
export class CheckoutPageModule {}
