import { Inject, Injectable } from '@angular/core';
import { Post } from "../../models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    @Inject("baseUrl") private baseUrl: string
  ) { }


  add(post: Post) {
    let url = `${this.baseUrl}api/postadd`;
  }
}
