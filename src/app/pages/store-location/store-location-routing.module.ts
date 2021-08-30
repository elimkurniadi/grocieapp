import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreLocationPage } from './store-location.page';

const routes: Routes = [
  {
    path: '',
    component: StoreLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreLocationPageRoutingModule {}
