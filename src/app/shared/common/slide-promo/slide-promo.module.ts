import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidePromoComponent } from './slide-promo.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SlidePromoComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [SlidePromoComponent],
})
export class SlidePromoModule {}
