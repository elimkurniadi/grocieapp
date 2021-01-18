import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteDetailComponent } from './favorite-detail/favorite-detail.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';

import { FavoritePage } from './favorite.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritePage,
    children: [
      {
        path: 'list',
        component: FavoriteListComponent,
      },
      {
        path: ':id/detail',
        component: FavoriteDetailComponent,
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
export class FavoritePageRoutingModule {}
