import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandListComponent } from './brand-list/brand-list.component';

import { BrandPage } from './brand.page';

const routes: Routes = [
  {
    path: '',
    component: BrandPage,
    children: [
      {
        path: 'list/:type',
        component: BrandListComponent,
      },
      {
        path: 'list',
        redirectTo: 'list/featured',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'list/featured',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandPageRoutingModule {}
