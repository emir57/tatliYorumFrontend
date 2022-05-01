import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseDataModel } from 'src/models/responseDataModel';
import { ResponseModel } from 'src/models/responseModel';
import { User } from 'src/models/user';
import { LoadingService } from './loading.service';
import { KeyType, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogin: boolean = false;
  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient,
    private storageService: StorageService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  register(user: User) {
    let url = `${this.baseUrl}/api/kayit`;
    return this.http.post<ResponseModel>(url, user);
  }
  login(user: User) {
    let url = `${this.baseUrl}/api/giris`;
    return this.http.post<ResponseDataModel<User>>(url, user);
  }

  setIsLogin(state: boolean) {
    this.isLogin = state;
  }
  getIsLogin(): boolean {
    return this.isLogin;
  }
  async logout() {
    await this.loadingService.showLoading("Çıkış yapılıyor..");
    this.isLogin = false;
    this.storageService.removeName(KeyType.User);
    setTimeout(async () => {
      await this.loadingService.closeLoading();
      this.router.navigateByUrl("/login");
    }, 700);
  }
}
