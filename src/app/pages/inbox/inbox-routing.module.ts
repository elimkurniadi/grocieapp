import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxDetailComponent } from './inbox-detail/inbox-detail.component';
import { InboxListComponent } from './inbox-list/inbox-list.component';

import { InboxPage } from './inbox.page';

const routes: Routes = [
  {
    path: '',
    component: InboxPage,
    children: [
      {
        path: 'list',
        component: InboxListComponent,
      },
      {
        path: ':id/detail',
        component: InboxDetailComponent,
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
export class InboxPageRoutingModule {}
