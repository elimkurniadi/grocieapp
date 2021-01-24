import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ItemListComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [ItemListComponent],
})
export class ItemListModule {}
