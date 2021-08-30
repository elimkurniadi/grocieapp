import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ModalConfirmationComponent } from '@shared/common/modals/modal-confirmation/modal-confirmation.component';
import { Response, Voucher } from '@shared/models';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { CacheService, GlobalService, ToastService } from '@shared/services';
import { UserService, VoucherService } from '@shared/services/modules';
import { VoucherBuySuccessComponent } from '../voucher-buy-success/voucher-buy-success.component';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss'],
})
export class VoucherDetailComponent implements OnInit {
  id: string;
  voucher: Voucher;
  voucherType: string;
  isOnFetch: boolean;
  redirectBackUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voucherSrv: VoucherService,
    private toastSrv: ToastService,
    private cache: CacheService,
    private gs: GlobalService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private navCtrl: NavController,
    private userSrv: UserService
  ) {
    this.route.params.subscribe((param) => {
      if (param.id !== null) {
        this.id = param.id;
      }
    });

    this.observeQueryParam();
  }

  observeQueryParam() {
    this.route.queryParams.subscribe((param) => {
      if (param?.type === 'point') {
        this.voucherType = 'buy';
        this.redirectBackUrl = '/loyalty-point';
      } else {
        this.voucherType = 'redeem';
        this.redirectBackUrl = '/checkout';
      }
    });
  }

  observeFetchState() {
    this.gs.observeOnFetch().subscribe((value: boolean) => {
      this.isOnFetch = value;
    });
  }

  ngOnInit() {
    this.getVoucher();
  }

  ionViewDidEnter() {
    this.observeFetchState();
  }

  getVoucher() {
    this.voucherSrv
      .getDetail(this.id)
      .then((res: Response) => {
        const voucher = res.response as Voucher;

        this.voucher = voucher;
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  useVoucher() {
    this.cache.setVoucher(this.voucher.voucher_id);
    this.router.navigate(['/checkout']);
  }

  buyVoucher() {
    this.voucherSrv
      .buyVoucher(this.id)
      .then(() => {
        this.userSrv.getProfile().then((res) => {
          this.presentSuccessModal(res);
        });
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }

  async presentConfirmModal() {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmationComponent,
      cssClass: 'modal-confirm',
      componentProps: {
        message: this.translate.get('BUY_VOUCHER_CONFIRM_MESSAGE'),
        messageClass: 'voucher-confirm-message',
      },
    });

    modal.onDidDismiss().then((res) => {
      const data = res.data;

      if (data && data.confirm) {
        this.buyVoucher();
      }
    });

    return await modal.present();
  }
  async presentSuccessModal(userData: any) {
    const modal = await this.modalCtrl.create({
      component: VoucherBuySuccessComponent,
      cssClass: 'modal-voucher-success',
      componentProps: {
        userData,
      },
    });

    modal.onDidDismiss().then((res) => {
      this.navCtrl.pop();
    });

    return await modal.present();
  }
}
