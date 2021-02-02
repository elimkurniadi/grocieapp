import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RegisterStepTwoComponent } from './register-step-two/register-step-two.component';
import { SharedModule } from '@shared/shared.module';
import { OtpModule } from '@shared/common/otp/otp.module';
import { ModalPinLocationModule } from '@shared/common/modal-pin-location/modal-pin-location.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    OtpModule,
    ModalPinLocationModule,
  ],
  declarations: [RegisterPage, RegisterStepTwoComponent],
})
export class RegisterPageModule {}
