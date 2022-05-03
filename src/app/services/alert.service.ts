import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController
  ) { }

  async showAlertConfirm(header: string, message: string, cancelCallBack: () => void, okayCallBack: () => void) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            cancelCallBack();
          }
        }, {
          text: 'Tamam',
          id: 'confirm-button',
          handler: () => {
            okayCallBack();
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlertWithInput(header: string, cancelCallBack: () => void, successCallBack: (value) => void) {
    const alert = await this.alertController.create({
      header: header,
      inputs: [
        {
          name: 'content',
          type: 'text',
          placeholder: 'Şikayet içeriği'
        },
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            cancelCallBack();
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            successCallBack(value);
          }
        }
      ]
    });
    await alert.present();
  }
}
