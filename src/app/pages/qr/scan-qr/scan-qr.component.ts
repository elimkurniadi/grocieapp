import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { PermissionService } from '@shared/services/permission.service';
import { ToastService } from '@shared/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQrComponent implements OnInit {
  constructor(private qrScanner: QRScanner, private toastSrv: ToastService, private permissionSrv: PermissionService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.initScanner();
  }

  initScanner() {
    this.prepareQr()
      .then((allowed: any) => {
        console.log('allowed: ', JSON.stringify(allowed));
        if (allowed) {
          const observer = this.scanningQr().subscribe((res: string) => {
            console.log('res!!!!!: ', res);
            this.toastSrv.show(res);
            this.qrScanner.hide();
            observer.unsubscribe();
          });
          this.qrScanner.show();
        } else {
          this.permissionSrv.cameraPermissionHandler();
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  }

  prepareQr(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.qrScanner
        .prepare()
        .then((status: QRScannerStatus) => {
          resolve(status.authorized);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  scanningQr(): Observable<any> {
    return new Observable<any>((observer) => {
      this.qrScanner.scan().subscribe(
        (res: any) => {
          observer.next(res);
        },
        (err) => {
          observer.next(err);
        }
      );
    });
  }
}
