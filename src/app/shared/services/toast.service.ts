import { Injectable } from '@angular/core';
import { Plugins, ToastShowOptions } from '@capacitor/core';
import { Platform, ToastController } from '@ionic/angular';
const { Toast } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private platform: Platform, private toastCtrl: ToastController) {}

  async show(message: string) {
    const isMobile = this.platform.is('cordova') || this.platform.is('capacitor');

    if (!isMobile) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
        color: 'white',
        position: 'bottom',
      });
      toast.present();
    } else {
      const options: ToastShowOptions = {
        text: message,
        duration: 'short',
        position: 'bottom',
      };
      await Toast.show(options);
    }
  }
}
