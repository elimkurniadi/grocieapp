import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { ProductListComponent } from './product-list/product-list.component';
import { SlidePromoModule } from '@shared/common/slide-promo/slide-promo.module';
import { CardModule } from '@shared/common/cards/card.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { SlideProductModule } from '@shared/common/slide-product/slide-product.module';
import { SharedModule } from '@shared/shared.module';
import { SlideBrandModule } from '@shared/common/slide-brand/slide-brand.module';
import { ProductSearchWithKeywordComponent } from './product-search/product-search-with-keyword/product-search-with-keyword.component';
import { ProductSearchWithoutKeywordComponent } from './product-search/product-search-without-keyword/product-search-without-keyword.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSkeletonComponent } from './product-skeleton/product-skeleton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    SlidePromoModule,
    CardModule,
    SlideProductModule,
    SharedModule,
    SlideBrandModule,
  ],
  declarations: [
    ProductPage,
    ProductListComponent,
    ProductSearchComponent,
    ProductSearchWithKeywordComponent,
    ProductSearchWithoutKeywordComponent,
    ProductDetailComponent,
    ProductSkeletonComponent,
  ],
})
export class ProductPageModule {}
