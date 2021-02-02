import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ItemListComponent],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule, RouterModule],
  exports: [ItemListComponent],
})
export class ItemListModule {}
