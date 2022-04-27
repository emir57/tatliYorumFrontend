import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseDataModel } from 'src/models/responseDataModel';
import { ResponseModel } from 'src/models/responseModel';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogin: boolean = false;
  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
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
}
