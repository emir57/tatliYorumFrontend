import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Complaint } from 'src/models/complaint';
import { ResponseDataListModel } from 'src/models/responseDataModel';

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
    return this.http.get<ResponseDataListModel<Complaint>>(url);
  }
}
