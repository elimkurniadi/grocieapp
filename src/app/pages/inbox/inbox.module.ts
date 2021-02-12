import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxPageRoutingModule } from './inbox-routing.module';

import { InboxPage } from './inbox.page';
import { InboxListComponent } from './inbox-list/inbox-list.component';
import { InboxDetailComponent } from './inbox-detail/inbox-detail.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, InboxPageRoutingModule, SharedModule],
  declarations: [InboxPage, InboxListComponent, InboxDetailComponent],
})
export class InboxPageModule {}
