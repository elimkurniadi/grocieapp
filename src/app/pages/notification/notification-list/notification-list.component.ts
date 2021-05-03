import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController, NavController } from '@ionic/angular';
import { ActivityService } from '@shared/services/modules/activity.service';
import { InboxDetailComponent } from '../../inbox/inbox-detail/inbox-detail.component';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  currentDate = Date.now();
  segmentValue = 'inbox';
  notificationList;
  inboxList;

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor(private activitySrv: ActivityService, private modalCtrl: ModalController, private navCtrl: NavController) {}

  ngOnInit() {
    this.getNotificationList();
    this.getInboxList();
  }

  segmentChanged(event: any) {
    const value = event.detail.value;
    let slideIdx = 0;
    if (value === 'notification') {
      slideIdx = 1;
    }

    this.slides.slideTo(slideIdx);
  }

  async slideChanged() {
    const activeIndex = await this.slides.getActiveIndex();
    if (activeIndex === 0) {
      this.segmentValue = 'inbox';
    } else {
      this.segmentValue = 'notification';
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('tabs/home');
  }

  getNotificationList() {
    this.activitySrv.getNotificationList().then((res) => {
      this.notificationList = res?.rows;
    });
  }

  getInboxList() {
    this.activitySrv.getInboxList().then((res) => {
      this.inboxList = res?.rows;
    });
  }

  async openDetail(data) {
    const modal = await this.modalCtrl.create({
      component: InboxDetailComponent,
      componentProps: { inbox: data },
    });

    modal.onDidDismiss().then(() => {
      // Refresh data
    });

    return await modal.present();
  }
}
