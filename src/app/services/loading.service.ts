import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingController: LoadingController
  ) { }

  async showLoading(message: string) {
    const loading = await this.loadingController.create({
      message: message,
      duration: 4000
    })
    return await loading.present();
  }
}
