import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

import { NotificationPage } from './notification.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage,
    children: [
      {
        path: 'list',
        component: NotificationListComponent,
      },
      {
        path: ':id/detail',
        component: NotificationDetailComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
