import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BundlingDetailComponent } from './bundling-detail/bundling-detail.component';

import { BundlingPage } from './bundling.page';

const routes: Routes = [
  {
    path: '',
    component: BundlingPage,
    children: [{ path: ':id/detail', component: BundlingDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundlingPageRoutingModule {}
