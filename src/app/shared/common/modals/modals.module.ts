import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { IonicModule } from '@ionic/angular';
import { ModalAddToFavoriteComponent } from './modal-add-to-favorite/modal-add-to-favorite.component';
import { SharedModule } from '@shared/shared.module';
import { ModalLocationComponent } from './modal-location/modal-location.component';
import { ModalFilterProductComponent } from './modal-filter-product/modal-filter-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalInfoComponent, ModalAddToFavoriteComponent, ModalLocationComponent, ModalFilterProductComponent],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule, FormsModule, ReactiveFormsModule],
  exports: [ModalInfoComponent, ModalAddToFavoriteComponent, ModalLocationComponent, ModalFilterProductComponent],
})
export class ModalsModule {}
