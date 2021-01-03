import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { ProductListComponent } from './product-list/product-list.component';
import { SlidePromoModule } from '@shared/common/slide-promo/slide-promo.module';
import { CardModule } from '@shared/common/cards/card.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProductPageRoutingModule, SlidePromoModule, CardModule],
  declarations: [ProductPage, ProductListComponent],
})
export class ProductPageModule {}
