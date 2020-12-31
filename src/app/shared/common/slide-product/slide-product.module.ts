import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideProductComponent } from './slide-product.component';
import { CardModule } from '../cards/card.module';

@NgModule({
  declarations: [SlideProductComponent],
  imports: [CommonModule, IonicModule.forRoot(), CardModule],
  exports: [SlideProductComponent],
})
export class SlideProductModule {}
