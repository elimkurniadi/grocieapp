import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPinLocationComponent } from './modal-pin-location.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ModalPinLocationComponent],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule],
  exports: [ModalPinLocationComponent],
})
export class ModalPinLocationModule {}
