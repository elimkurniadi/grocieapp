import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SharedModule } from '@shared/shared.module';
import { OtpModule } from '@shared/common/otp/otp.module';
import { ModalsModule } from '@shared/common/modals/modals.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilePageRoutingModule, SharedModule, OtpModule, ModalsModule],
  declarations: [ProfilePage],
  providers: [AppVersion],
})
export class ProfilePageModule {}
