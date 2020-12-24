import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ModalInfoComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [ModalInfoComponent],
})
export class ModalsModule {}
