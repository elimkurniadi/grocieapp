import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrPage } from './qr.page';
import { ScanQrComponent } from './scan-qr/scan-qr.component';

const routes: Routes = [
  {
    path: '',
    component: QrPage,
  },
  {
    path: 'scan',
    component: ScanQrComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrPageRoutingModule {}
