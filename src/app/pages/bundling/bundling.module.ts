import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BundlingPageRoutingModule } from './bundling-routing.module';

import { BundlingPage } from './bundling.page';
import { BundlingDetailComponent } from './bundling-detail/bundling-detail.component';
import { CardModule } from '@shared/common/cards/card.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BundlingPageRoutingModule, CardModule, SharedModule],
  declarations: [BundlingPage, BundlingDetailComponent],
})
export class BundlingPageModule {}
