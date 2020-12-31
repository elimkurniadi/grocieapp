import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { RequestOtpComponent } from './request-otp/request-otp.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SharedModule } from '@shared/shared.module';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ModalsModule } from '@shared/common/modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule,
    SharedModule,
    ModalsModule,
  ],
  declarations: [RequestOtpComponent, VerifyOtpComponent, SetPasswordComponent],
})
export class ChangePasswordPageModule {}
