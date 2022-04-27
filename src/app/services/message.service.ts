import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController: ToastController
  ) { }

  async showMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position:
    });
    toast.present();
  }
}
export enum MessagePosition {
  Top = "top",
  Bottom = "bottom",
  Middle = "middle"
}
