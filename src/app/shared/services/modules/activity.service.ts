import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Page, ResponsePagination, Sort } from '@shared/models';
import { GlobalService } from '../global.service';
import { UserService } from './user.service';

import {
  Capacitor,
  Plugins,
  PushNotification,
  PushNotificationActionPerformed,
  PushNotificationToken,
} from '@capacitor/core';

import { FCM } from '@capacitor-community/fcm';
import { ToastService } from '../toast.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

const { PushNotifications } = Plugins;
const fcm = new FCM();

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(
    private api: ApiService,
    private gs: GlobalService,
    private userSrv: UserService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  getNotificationList(pagination?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`notification/system`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getInboxList(pagination?: Page, ordering?: Sort): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.api.getData(`notification/inbox`);
      this.gs.pushSubscription(subscription);
      subscription.subscribe(
        (res) => {
          resolve(res?.response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        PushNotifications.register().then(() => {
          this.userSrv.getProfile().then((user) => {
            let topicUser = user?.user_id;
            let topicGlobal = 'global';
            if (environment.production) {
              topicUser = 'prod-' + user?.user_id;
              topicGlobal = 'prod-global';
            }

            fcm
              .subscribeTo({ topic: topicUser })
              .then((r) => this.gs.log('TOPIC yang ke subscribe 1', r))
              .catch((err) => this.gs.log(err));

            fcm
              .subscribeTo({ topic: topicGlobal })
              .then((r) => this.gs.log('TOPIC yang ke subscribe 2', r))
              .catch((err) => this.gs.log(err));
          });
        });
      }
    });
  }

  initPushListener() {
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      this.gs.log('My token: ' + JSON.stringify(token));
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      this.gs.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotification) => {
      this.gs.log('Push received: ' + JSON.stringify(notification));
      // this.router.navigateByUrl(`/tabs/home?notifTitle=${notification.title}&notifBody=${notification.body}`);
      this.presentToast(notification.title, notification.body);
    });

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        this.gs.log('Action performed: ' + JSON.stringify(notification.notification));
        this.router.navigateByUrl(`/tabs/home?openNotif=true`);
        // if (data.detailsId) {
        //   this.router.navigateByUrl(`/home/${data.detailsId}`);
        // }
      }
    );
  }

  async presentToast(title: string, body: string) {
    const toast = await this.toastCtrl.create({
      header: title,
      message: body,
      position: 'top',
      color: 'white',
      duration: 3000,
      buttons: [
        {
          side: 'end',
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl(`/tabs/home?openNotif=true`);
          },
        },
      ],
    });
    toast.present();
  }
}
