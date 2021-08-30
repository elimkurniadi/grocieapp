import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './card-product/card-product.component';
import { IonicModule } from '@ionic/angular';
import { CardBrandComponent } from './card-brand/card-brand.component';
import { CardArticleComponent } from './card-article/card-article.component';
import { SharedModule } from '@shared/shared.module';
import { CardCategoryComponent } from './card-category/card-category.component';
import { RouterModule } from '@angular/router';
import { ModalsModule } from '../modals/modals.module';
import { CardAddressComponent } from './card-address/card-address.component';
import { CardVoucherComponent } from './card-voucher/card-voucher.component';
import { CardOrderComponent } from './card-order/card-order.component';
import { CardVoucherPointComponent } from './card-voucher-point/card-voucher-point.component';
import { CardSubcategoryComponent } from './card-subcategory/card-subcategory.component';

@NgModule({
  declarations: [
    CardProductComponent,
    CardBrandComponent,
    CardArticleComponent,
    CardCategoryComponent,
    CardAddressComponent,
    CardVoucherComponent,
    CardOrderComponent,
    CardVoucherPointComponent,
    CardSubcategoryComponent,
  ],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule, RouterModule, ModalsModule],
  exports: [
    CardProductComponent,
    CardBrandComponent,
    CardArticleComponent,
    CardCategoryComponent,
    CardAddressComponent,
    CardVoucherComponent,
    CardOrderComponent,
    CardVoucherPointComponent,
    CardSubcategoryComponent,
  ],
})
export class CardModule {}
