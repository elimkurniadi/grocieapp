import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreLocationPageRoutingModule } from './store-location-routing.module';

import { StoreLocationPage } from './store-location.page';
import { SharedModule } from '@shared/shared.module';
import { StoreLocationSkeletonComponent } from './store-location-skeleton/store-location-skeleton.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, StoreLocationPageRoutingModule, SharedModule],
  declarations: [StoreLocationPage, StoreLocationSkeletonComponent],
})
export class StoreLocationPageModule {}
