import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalConfirmationComponent } from '@shared/common/modals/modal-confirmation/modal-confirmation.component';
import { Transaction } from '@shared/models';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { ToastService } from '@shared/services';
import { TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss'],
})
export class CardOrderComponent implements OnInit {
  @Input() order: Transaction;

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private router: Router,
    private transactionSrv: TransactionService,
    private toastSrv: ToastService
  ) {}

  ngOnInit() {}

  async presentConfirmModal(order: any) {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmationComponent,
      cssClass: 'modal-confirm',
      componentProps: {
        title: this.translate.get('ORDER_ARRIVED'),
        message: this.translate.get('ORDER_ARRIVED_MESSAGE'),
      },
    });

    modal.onDidDismiss().then((res) => {
      const data = res.data;

      if (data && data.confirm) {
        this.confirmArrived(order?.transaction_id);
      }
    });

    return await modal.present();
  }

  goToDetail(orderId: any) {
    this.router.navigate(['/my-order', orderId, 'detail']);
  }

  confirmArrived(orderId: any) {
    this.transactionSrv
      .confirmOrder(orderId)
      .then((res) => {
        this.router.navigate(['/my-order', orderId, 'detail']);
      })
      .catch((err) => {
        const error = err.error.error;
        this.toastSrv.show(error.message);
      });
  }
}
