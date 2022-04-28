import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
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
    let url = `${this.baseUrl}api/postadd`;
    return this.http.post<ResponseModel>(url, post);
  }
}
