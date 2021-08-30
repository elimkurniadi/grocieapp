import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyPointHistoryComponent } from './loyalty-point-history/loyalty-point-history.component';

import { LoyaltyPointPage } from './loyalty-point.page';

const routes: Routes = [
  {
    path: '',
    component: LoyaltyPointPage,
  },
  {
    path: 'history',
    component: LoyaltyPointHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoyaltyPointPageRoutingModule {}
