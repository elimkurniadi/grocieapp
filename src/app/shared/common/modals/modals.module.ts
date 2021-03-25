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
import { ModalFaqComponent } from './modal-faq/modal-faq.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ModalMaintenanceComponent } from './modal-maintenance/modal-maintenance.component';
import { ModalUpdateComponent } from './modal-update/modal-update.component';

const MODAL_COMPONENT = [
  ModalInfoComponent,
  ModalAddToFavoriteComponent,
  ModalAddToCartComponent,
  ModalLocationComponent,
  ModalFilterProductComponent,
  ModalSortProductComponent,
  ModalSettingComponent,
  ModalShareAppComponent,
  ModalConfirmationComponent,
  ModalFaqComponent,
  ModalMaintenanceComponent,
  ModalUpdateComponent,
];
@NgModule({
  declarations: MODAL_COMPONENT,
  imports: [CommonModule, IonicModule.forRoot(), SharedModule, FormsModule, ReactiveFormsModule, MatExpansionModule],
  exports: MODAL_COMPONENT,
})
export class ModalsModule {}
