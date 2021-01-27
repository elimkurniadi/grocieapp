import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOtpComponent } from './modal-otp/modal-otp.component';
import { ModalSuccessComponent } from './modal-success/modal-success.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule } from '@angular/forms';
import { EmailVerificationModule } from '../email-verification/email-verification.module';

@NgModule({
  declarations: [ModalOtpComponent, ModalSuccessComponent],
  imports: [CommonModule, IonicModule.forRoot(), SharedModule, NgOtpInputModule, FormsModule, EmailVerificationModule],
  exports: [ModalOtpComponent, ModalSuccessComponent],
})
export class OtpModule {}
