import { Injectable } from '@angular/core';
import { Plugins, ToastShowOptions } from '@capacitor/core';
const { Toast } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  async show(message: string) {
    const options: ToastShowOptions = {
      text: message,
      duration: 'short',
      position: 'bottom',
    };
    await Toast.show(options);
  }
}
