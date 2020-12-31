import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './card-product/card-product.component';
import { IonicModule } from '@ionic/angular';
import { CardBrandComponent } from './card-brand/card-brand.component';
import { CardArticleComponent } from './card-article/card-article.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CardProductComponent, CardBrandComponent, CardArticleComponent],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule],
  exports: [CardProductComponent, CardBrandComponent, CardArticleComponent],
})
export class CardModule {}
