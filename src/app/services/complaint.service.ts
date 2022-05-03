import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Complaint } from 'src/models/complaint';
import { ResponseDataListModel } from 'src/models/responseDataModel';
import { ResponseModel } from 'src/models/responseModel';

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
  getAllByPostId(postId: number) {
    let url = `${this.baseUrl}/api/complaints/${postId}`;
    return this.http.get<ResponseDataListModel<Complaint>>(url);
  }
  add(complaintModel: Complaint) {
    let url = `${this.baseUrl}/api/complaintadd`;
    return this.http.post<ResponseModel>(url, complaintModel);
  }
  delete(complaintId: number) {
    let url = `${this.baseUrl}/api/complaintdelete/${complaintId}`;
    return this.http.delete<ResponseModel>(url);
  }
}
