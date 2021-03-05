import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { ShowQrComponent } from './show-qr/show-qr.component';
import { SharedModule } from '@shared/shared.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
// import { QRScanner } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, QrPageRoutingModule, SharedModule, NgxQRCodeModule],
  declarations: [QrPage, ScanQrComponent, ShowQrComponent],
  providers: [],
})
export class QrPageModule {}
