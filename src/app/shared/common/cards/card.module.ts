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

@NgModule({
  declarations: [
    CardProductComponent,
    CardBrandComponent,
    CardArticleComponent,
    CardCategoryComponent,
    CardAddressComponent,
  ],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule, RouterModule, ModalsModule],
  exports: [
    CardProductComponent,
    CardBrandComponent,
    CardArticleComponent,
    CardCategoryComponent,
    CardAddressComponent,
  ],
})
export class CardModule {}
