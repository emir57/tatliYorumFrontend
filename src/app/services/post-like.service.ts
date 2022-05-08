import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PostLike } from 'src/models/postLike';
import { ResponseDataListModel } from 'src/models/responseDataModel';
import { ResponseModel } from 'src/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  getAll() {
    let url = `${this.baseUrl}/api/postlikes`;
    return this.http.get<ResponseDataListModel<PostLike>>(url);
  }
  delete(id: number) {
    let url = `${this.baseUrl}/api/deletepostlike/${id}`;
    return this.http.delete<ResponseModel>(url);
  }
}
