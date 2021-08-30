import { Component, OnInit } from '@angular/core';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { PermissionService } from '@shared/services/permission.service';
import { ToastService } from '@shared/services/toast.service';
import { Observable } from 'rxjs';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ProductService } from '@shared/services/modules';
import { Product } from '@shared/models';
import { Router } from '@angular/router';
import { GlobalService } from '@shared/services';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQrComponent implements OnInit {
  scannedData: any;

  constructor(
    private toastSrv: ToastService,
    private permissionSrv: PermissionService,
    private barcodeScanner: BarcodeScanner,
    private productSrv: ProductService,
    private router: Router,
    private gs: GlobalService,
    private navCtrl: NavController
  ) {
    this.handleCameraPermission();
  }

  ngOnInit() {
    this.initScanner();
  }

  async handleCameraPermission() {
    await this.permissionSrv.cameraPermissionHandler();
  }

  initScanner() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
    };

    this.barcodeScanner
      .scan(options)
      .then((barcodeData) => {
        this.gs.log('Barcode data', barcodeData.cancelled);
        this.scannedData = barcodeData;
        if (!this.scannedData.cancelled) {
          this.getProduct(this.scannedData.text);
        } else {
          this.navCtrl.back();
        }
      })
      .catch((err) => {
        this.gs.log('Error', err);
      });
  }

  getProduct(sku: string) {
    this.productSrv
      .getBySKU(sku)
      .then((res) => {
        const product = res.response as Product;
        this.router.navigate(['/product', 'detail', product.product_id]);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
        this.navCtrl.back();
      });
  }
}
