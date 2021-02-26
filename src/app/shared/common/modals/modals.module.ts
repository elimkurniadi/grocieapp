import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { IonicModule } from '@ionic/angular';
import { ModalAddToFavoriteComponent } from './modal-add-to-favorite/modal-add-to-favorite.component';
import { SharedModule } from '@shared/shared.module';
import { ModalLocationComponent } from './modal-location/modal-location.component';
import { ModalFilterProductComponent } from './modal-filter-product/modal-filter-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalSortProductComponent } from './modal-sort-product/modal-sort-product.component';
import { ModalSettingComponent } from './modal-setting/modal-setting.component';
import { ModalShareAppComponent } from './modal-share-app/modal-share-app.component';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';
import { ModalAddToCartComponent } from './modal-add-to-cart/modal-add-to-cart.component';

@NgModule({
  declarations: [
    ModalInfoComponent,
    ModalAddToFavoriteComponent,
    ModalAddToCartComponent,
    ModalLocationComponent,
    ModalFilterProductComponent,
    ModalSortProductComponent,
    ModalSettingComponent,
    ModalShareAppComponent,
    ModalConfirmationComponent,
  ],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule, FormsModule, ReactiveFormsModule],
  exports: [
    ModalInfoComponent,
    ModalAddToFavoriteComponent,
    ModalAddToCartComponent,
    ModalLocationComponent,
    ModalFilterProductComponent,
    ModalSortProductComponent,
    ModalSettingComponent,
    ModalShareAppComponent,
    ModalConfirmationComponent,
  ],
})
export class ModalsModule {}
