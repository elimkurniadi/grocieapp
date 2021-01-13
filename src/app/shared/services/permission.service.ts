import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(
    private androidPermisssions: AndroidPermissions,
    private alertSrv: AlertService,
    private translateSrv: TranslateService,
    private navCtrl: NavController
  ) {}

  checkPermission(type: string): Promise<any> {
    let permission: any = null;
    if (type === 'camera') {
      permission = this.androidPermisssions.PERMISSION.CAMERA;
    }
    return new Promise((resolve, reject) => {
      this.androidPermisssions
        .checkPermission(permission)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  requestPermission(type: string): Promise<any> {
    let permission: any = null;
    if (type === 'camera') {
      permission = this.androidPermisssions.PERMISSION.CAMERA;
    }
    return new Promise((resolve, reject) => {
      this.androidPermisssions
        .requestPermission(permission)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async cameraPermissionHandler() {
    await this.checkPermission('camera')
      .then((resCheck: any) => {
        if (!resCheck.hasPermission) {
          this.requestPermission('camera')
            .then((resReq: any) => {
              if (!resReq.hasPermission) {
                this.showAlertCameraDenied();
              }
            })
            .catch(() => {
              this.showAlertCameraDenied();
            });
        }
      })
      .catch(() => {});
  }

  async showAlertCameraDenied() {
    await this.alertSrv.presentAlert({
      message: `${this.translateSrv.get('ALERT_CAM_DENIED')}`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.back();
          },
        },
      ],
    });
  }
}
