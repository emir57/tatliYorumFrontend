import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseDataModel } from 'src/models/responseDataModel';
import { ResponseModel } from 'src/models/responseModel';
import { Post } from "../../models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }


  add(post: Post) {
    let url = `${this.baseUrl}/api/postadd`;
    return this.http.post<ResponseModel>(url, post);
  }
  delete(postId: number) {
    let url = `${this.baseUrl}/api/postdelete/${postId}`;
    return this.http.delete<ResponseModel>(url);
  }
  update(post: Post) {
    let url = `${this.baseUrl}/api/postupdate`;
    return this.http.post<ResponseModel>(url, post);
  }
  getById(postId: number) {
    let url = `${this.baseUrl}/api/posts/${postId}`;
    return this.http.get<ResponseDataModel<Post>>(url);
  }
  getAll() {
    let url = `${this.baseUrl}/api/posts`;
    return this.http.get<ResponseDataModel<Post[]>>(url);
  }
}
