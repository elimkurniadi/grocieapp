import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { SharedModule } from '@shared/shared.module';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NotificationPageRoutingModule, SharedModule],
  declarations: [NotificationPage, NotificationListComponent, NotificationDetailComponent],
})
export class NotificationPageModule {}
