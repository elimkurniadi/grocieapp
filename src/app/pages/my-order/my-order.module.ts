import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrderPageRoutingModule } from './my-order-routing.module';

import { MyOrderPage } from './my-order.page';
import { SharedModule } from '@shared/shared.module';
import { MyOrderListComponent } from './my-order-list/my-order-list.component';
import { CardModule } from '@shared/common/cards/card.module';
import { ModalsModule } from '@shared/common/modals/modals.module';
import { MyOrderDetailComponent } from './my-order-detail/my-order-detail.component';
import { ItemListModule } from '@shared/common/item-list/item-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrderPageRoutingModule,
    SharedModule,
    CardModule,
    ModalsModule,
    ItemListModule,
  ],
  declarations: [MyOrderPage, MyOrderListComponent, MyOrderDetailComponent],
})
export class MyOrderPageModule {}
