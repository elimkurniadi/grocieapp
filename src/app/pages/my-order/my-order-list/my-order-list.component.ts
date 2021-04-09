import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { TransactionService } from '@shared/services/modules';

@Component({
  selector: 'app-my-order-list',
  templateUrl: './my-order-list.component.html',
  styleUrls: ['./my-order-list.component.scss'],
})
export class MyOrderListComponent implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  segmentValue = 'ongoing';
  orders: any[] = null;
  completedOrders: any[] = null;

  constructor(private transactionSrv: TransactionService) {}

  ngOnInit() {
    this.getTransactionList();
    this.getTransactionCompletedList();
  }

  segmentChanged(event: any) {
    const value = event.detail.value;
    let slideIdx = 0;
    if (value === 'history') {
      slideIdx = 1;
    }

    this.slides.slideTo(slideIdx);
  }

  async slideChanged() {
    const activeIndex = await this.slides.getActiveIndex();
    if (activeIndex === 0) {
      this.segmentValue = 'ongoing';
    } else {
      this.segmentValue = 'history';
    }
  }

  getTransactionList() {
    this.orders = null;
    this.transactionSrv.getTransaction().then((res) => {
      this.orders = res.response.rows;
    });
  }

  getTransactionCompletedList() {
    this.completedOrders = null;
    this.transactionSrv.getTransactionHistory().then((res) => {
      this.completedOrders = res.response.rows;
    });
  }

  onRefresh(event) {
    if (this.segmentValue === 'ongoing') {
      this.getTransactionList();
    } else {
      this.getTransactionCompletedList();
    }
    event.target.complete();
  }
}
