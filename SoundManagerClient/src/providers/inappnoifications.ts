import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class InAppNotification {
  public constructor(private toastController: ToastController) {

  }

  public showToastNotification(message: string, duration?: number, position?: string) {

    duration = duration ? duration : 3000;
    position = position ? position : 'top';

    this.toastController.create({
      message: message,
      duration: duration,
      position: position
    }).present();
  }
}