import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { IonicModule } from '@ionic/angular';
import { ModalAddToFavoriteComponent } from './modal-add-to-favorite/modal-add-to-favorite.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ModalInfoComponent, ModalAddToFavoriteComponent],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule],
  exports: [ModalInfoComponent, ModalAddToFavoriteComponent],
})
export class ModalsModule {}
