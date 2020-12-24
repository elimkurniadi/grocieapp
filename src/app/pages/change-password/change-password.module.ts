import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { RequestOtpComponent } from './request-otp/request-otp.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ChangePasswordPageRoutingModule, SharedModule],
  declarations: [RequestOtpComponent, VerifyOtpComponent],
})
export class ChangePasswordPageModule {}
