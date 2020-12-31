import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModule } from '@shared/shared.module';
import { SlidePromoModule } from '@shared/common/slide-promo/slide-promo.module';
import { HomeCategoriesComponent } from './home-categories/home-categories.component';
import { HomeGroceriesComponent } from './home-groceries/home-groceries.component';
import { CardModule } from '@shared/common/cards/card.module';
import { SlideProductModule } from '@shared/common/slide-product/slide-product.module';
import { HomeSpecialsComponent } from './home-specials/home-specials.component';
import { HomeBrandsComponent } from './home-brands/home-brands.component';
import { SlideBrandModule } from '@shared/common/slide-brand/slide-brand.module';
import { HomeArticlesComponent } from './home-articles/home-articles.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SlidePromoModule,
    SlideProductModule,
    SlideBrandModule,
    CardModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
  ],
  declarations: [
    HomePage,
    HomeCategoriesComponent,
    HomeGroceriesComponent,
    HomeSpecialsComponent,
    HomeBrandsComponent,
    HomeArticlesComponent,
  ],
})
export class HomePageModule {}
