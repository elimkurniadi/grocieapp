import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./pages/change-password/change-password.module').then((m) => m.ChangePasswordPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then((m) => m.ProductPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then((m) => m.QrPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'favorite',
    loadChildren: () => import('./pages/favorite/favorite.module').then((m) => m.FavoritePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then((m) => m.CheckoutPageModule),
  },
  {
    path: 'address',
    loadChildren: () => import('./pages/address/address.module').then((m) => m.AddressPageModule),
  },
  {
    path: 'bundling',
    loadChildren: () => import('./pages/bundling/bundling.module').then((m) => m.BundlingPageModule),
  },
  {
    path: 'brand',
    loadChildren: () => import('./pages/brand/brand.module').then((m) => m.BrandPageModule),
  },
  {
    path: 'voucher',
    loadChildren: () => import('./pages/voucher/voucher.module').then((m) => m.VoucherPageModule),
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then((m) => m.NotificationPageModule),
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then((m) => m.InboxPageModule),
  },
  {
    path: 'my-order',
    loadChildren: () => import('./pages/my-order/my-order.module').then( m => m.MyOrderPageModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./pages/article/article.module').then( m => m.ArticlePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
