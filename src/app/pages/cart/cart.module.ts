import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { SharedModule } from '@shared/shared.module';
import { ItemListModule } from '@shared/common/item-list/item-list.module';
import { SlideProductModule } from '@shared/common/slide-product/slide-product.module';
import { ItemListInactiveModule } from '@shared/common/item-list-inactive/item-list-inactive.module';
import { CartEmptyComponent } from './cart-empty/cart-empty.component';
import { CartSkeletonComponent } from './cart-skeleton/cart-skeleton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    SharedModule,
    ItemListModule,
    ItemListInactiveModule,
    SlideProductModule,
  ],
  declarations: [CartPage, CartEmptyComponent, CartSkeletonComponent],
})
export class CartPageModule {}
