import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { OtpModule } from '@shared/common/otp/otp.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TabsPageRoutingModule, OtpModule],
  declarations: [TabsPage],
})
export class TabsPageModule {}
