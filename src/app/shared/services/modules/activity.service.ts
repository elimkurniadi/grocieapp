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

const { PushNotifications } = Plugins;
const fcm = new FCM();

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private api: ApiService, private gs: GlobalService, private userSrv: UserService) {

  }

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
          this.userSrv.getProfile().then(user => {
            console.log('DATA USER', user);
            fcm.subscribeTo({ topic: user?.user_id })
              .then((r) => console.log('TOPIC yang ke subscribe 1', r))
              .catch((err) => console.log(err));

            fcm.subscribeTo({ topic: 'global' })
              .then((r) => console.log('TOPIC yang ke subscribe 2', r))
              .catch((err) => console.log(err));
          });
        });
      }
    });

    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log('My token: ' + JSON.stringify(token));
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotification) => {
      console.log('Push received: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        // if (data.detailsId) {
        //   this.router.navigateByUrl(`/home/${data.detailsId}`);
        // }
      }
    );
  }

}
