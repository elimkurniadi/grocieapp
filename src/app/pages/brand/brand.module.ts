import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandPageRoutingModule } from './brand-routing.module';

import { BrandPage } from './brand.page';
import { BrandListComponent } from './brand-list/brand-list.component';
import { CardModule } from '@shared/common/cards/card.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BrandPageRoutingModule, CardModule],
  declarations: [BrandPage, BrandListComponent],
})
export class BrandPageModule {}
