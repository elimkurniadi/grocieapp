import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalEmailVerificationComponent } from './modal-email-verification/modal-email-verification.component';
import { ModalEmailSuccessComponent } from './modal-email-success/modal-email-success.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ModalEmailVerificationComponent, ModalEmailSuccessComponent],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule],
  exports: [ModalEmailVerificationComponent, ModalEmailSuccessComponent],
})
export class EmailVerificationModule {}
