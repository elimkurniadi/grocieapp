import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideBrandComponent } from './slide-brand.component';
import { IonicModule } from '@ionic/angular';
import { CardModule } from '../cards/card.module';

@NgModule({
  declarations: [SlideBrandComponent],
  imports: [CommonModule, IonicModule.forRoot(), CardModule],
  exports: [SlideBrandComponent],
})
export class SlideBrandModule {}
