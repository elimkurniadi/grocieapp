import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListInactiveComponent } from './item-list-inactive.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ItemListInactiveComponent],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule],
  exports: [ItemListInactiveComponent],
})
export class ItemListInactiveModule {}
