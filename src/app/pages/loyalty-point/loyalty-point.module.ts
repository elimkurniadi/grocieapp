import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoyaltyPointPageRoutingModule } from './loyalty-point-routing.module';

import { LoyaltyPointPage } from './loyalty-point.page';
import { SharedModule } from '@shared/shared.module';
import { CardModule } from '@shared/common/cards/card.module';
import { LoyaltyPointHistoryComponent } from './loyalty-point-history/loyalty-point-history.component';
import { LoyaltyPointSkeletonComponent } from './loyalty-point-skeleton/loyalty-point-skeleton.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoyaltyPointPageRoutingModule, SharedModule, CardModule],
  declarations: [LoyaltyPointPage, LoyaltyPointHistoryComponent, LoyaltyPointSkeletonComponent],
})
export class LoyaltyPointPageModule {}
