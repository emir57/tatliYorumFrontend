import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseDataListModel } from 'src/models/responseDataModel';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  getAll() {
    let url = `${this.baseUrl}/api/complaints`;
    return this.http.get<ResponseDataListModel<User>>(url);
  }
}
