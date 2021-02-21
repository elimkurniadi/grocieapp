import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalConfirmationComponent } from '@shared/common/modals/modal-confirmation/modal-confirmation.component';
import { TranslateService } from '@shared/pipes/translate/translate.service';
import { TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss'],
})
export class CardOrderComponent implements OnInit {
  @Input() order = {
    transaction_code: 'AHS - 70009876543',
    transaction_id: 'AHS - 70009876543',
    payment_method : {
      name: 'Virtual account'
    },
    transaction_status: {
      name: 'IN_PROCESS'
    },
    order_status_name: 'Order In Process',
    created_at: new Date(),
    order_payment_method: 'Manual Bank Transfer',
    total_price: '70000',
  };

  constructor(private modalCtrl: ModalController, private translate: TranslateService, private router: Router, private transactionSrv: TransactionService) {}

  ngOnInit() {
    console.log("ISI DARI ORDER GUYS", this.order);
  }

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
    this.router.navigate(['/tabs', 'profile']);
  }
}
