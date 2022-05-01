import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PostComment } from 'src/models/postComment';
import { ResponseDataListModel } from 'src/models/responseDataModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  getAll() {
    let url = `${this.baseUrl}/api/comments`;
    return this.http.get<ResponseDataListModel<PostComment>>(url);
  }
}
