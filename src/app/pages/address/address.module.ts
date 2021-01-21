import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressPageRoutingModule } from './address-routing.module';

import { AddressPage } from './address.page';
import { AddressFormComponent } from './address-form/address-form.component';
import { CardModule } from '@shared/common/cards/card.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressPageRoutingModule,
    CardModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [AddressPage, AddressFormComponent],
})
export class AddressPageModule {}
