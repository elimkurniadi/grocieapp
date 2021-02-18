import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalConfirmationComponent } from '@shared/common/modals/modal-confirmation/modal-confirmation.component';
import { TranslateService } from '@shared/pipes/translate/translate.service';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss'],
})
export class CardOrderComponent implements OnInit {
  @Input() order = {
    order_id: 'AHS - 70009876543',
    order_status: 'in_process',
    order_status_name: 'Order In Process',
    order_date: new Date(),
    order_payment_method: 'Manual Bank Transfer',
    total_payment: '70000',
  };

  constructor(private modalCtrl: ModalController, private translate: TranslateService, private router: Router) {}

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
        this.confirmArrived(order?.order_id);
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
