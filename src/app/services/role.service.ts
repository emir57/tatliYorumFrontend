import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { LoadingService } from './loading.service';
import { KeyType, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  isAdmin: boolean = false;
  constructor(
    private loadingService: LoadingService,
    private storageService: StorageService
  ) {

  }

  async checkIsAdmin() {
    await this.loadingService.showLoading("İşlemler yapılıyor lütfen bekleyiniz.");
    let user = JSON.parse(await this.storageService.checkName(KeyType.User));
    this.isAdmin = user.isAdmin === 1 ? true : false;
    console.log(user.isAdmin)
    await this.loadingService.closeLoading();
  }
}
