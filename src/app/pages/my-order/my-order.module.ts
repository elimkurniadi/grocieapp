import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrderPageRoutingModule } from './my-order-routing.module';

import { MyOrderPage } from './my-order.page';
import { SharedModule } from '@shared/shared.module';
import { MyOrderListComponent } from './my-order-list/my-order-list.component';
import { CardModule } from '@shared/common/cards/card.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MyOrderPageRoutingModule, SharedModule, CardModule],
  declarations: [MyOrderPage, MyOrderListComponent],
})
export class MyOrderPageModule {}
