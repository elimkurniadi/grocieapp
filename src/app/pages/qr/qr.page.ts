import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { AlertService } from '@shared/services/alert.service';
import { PermissionService } from '@shared/services/permission.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit, OnDestroy {
  isShow = true;
  routeObserver: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private permissionSrv: PermissionService,
    private alertSrv: AlertService,
    private translateSrv: TranslateService,
    private navCtrl: NavController
  ) {
    this.handleCameraPermission();
    this.handleQrRouting();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.routeObserver.unsubscribe();
  }

  handleQrRouting() {
    this.routeObserver = this.activatedRoute.queryParams.subscribe((param) => {
      param?.type === 'scan' ? (this.isShow = false) : (this.isShow = true);
    });
  }

  changeMode(mode) {
    mode === 'show' ? (this.isShow = true) : (this.isShow = false);
  }

  async handleCameraPermission() {
    await this.permissionSrv.cameraPermissionHandler();
  }
}
