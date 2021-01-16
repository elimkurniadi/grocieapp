import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductSearchComponent } from './product-search/product-search.component';

import { ProductPage } from './product.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPage,
    children: [
      {
        path: 'list',
        component: ProductListComponent,
      },
      {
        path: 'search',
        component: ProductSearchComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
