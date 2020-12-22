import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RegisterStepTwoComponent } from './register-step-two/register-step-two.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RegisterPageRoutingModule, FontAwesomeModule, ReactiveFormsModule],
  declarations: [RegisterPage, RegisterStepTwoComponent],
})
export class RegisterPageModule {}
