import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PostComment } from 'src/models/postComment';
import { ResponseDataListModel } from 'src/models/responseDataModel';
import { ResponseModel } from 'src/models/responseModel';

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

  getAllByPostId(postId: number) {
    let url = `${this.baseUrl}/api/postcomments/${postId}`;
    return this.http.get<ResponseDataListModel<PostComment>>(url);
  }

  add(postComment: PostComment) {
    let url = `${this.baseUrl}/api/commentadd`;
    return this.http.post<ResponseModel>(url, postComment);
  }

  update(postComment: PostComment) {
    let url = `${this.baseUrl}/api/commentupdate`;
    return this.http.post<ResponseModel>(url, postComment);
  }

  delete(commentId: number) {
    let url = `${this.baseUrl}/api/commentdelete/${commentId}`;
    return this.http.delete<ResponseModel>(url);
  }
}
