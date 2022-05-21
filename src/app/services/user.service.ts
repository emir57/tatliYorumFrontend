import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseDataModel } from 'src/models/responseDataModel';
import { ResponseModel } from 'src/models/responseModel';
import { User } from 'src/models/user';
import { LoadingService } from './loading.service';
import { KeyType, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private storageService: StorageService,
    private httpClient: HttpClient,
    private loadService: LoadingService
  ) { }

  async getUser() {
    let user: User = JSON.parse(await this.storageService.checkName(KeyType.User))
    return user;
  }

  getUserById(userId: number) {
    let url = `${this.baseUrl}/api/users/${userId}`;
    return this.httpClient.get<ResponseDataModel<User>>(url);
  }

  async getAll(successCallBack?: (response: ResponseDataModel<User[]>) => void, errorCallBack?: () => void) {
    await this.loadService.showLoading("");
    let url = `${this.baseUrl}/api/users`;
    this.httpClient.get<ResponseDataModel<User[]>>(url).subscribe(async response => {
      if (response.success) {
        successCallBack(response);
      } else {
        errorCallBack();
      }
      await this.loadService.closeLoading();
    })
  }
}
