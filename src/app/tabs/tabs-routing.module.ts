import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'favorite',
        loadChildren: () => import('../pages/favorite/favorite.module').then((m) => m.FavoritePageModule),
      },
      {
        path: 'cart',
        loadChildren: () => import('../pages/cart/cart.module').then((m) => m.CartPageModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('../pages/chat/chat.module').then((m) => m.ChatPageModule),
      },
      {
        path: 'notification',
        loadChildren: () => import('../pages/notification/notification.module').then((m) => m.NotificationPageModule),
      },
      {
        path: 'inbox',
        loadChildren: () => import('../pages/inbox/inbox.module').then((m) => m.InboxPageModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
