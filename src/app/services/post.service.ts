import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PostLike } from 'src/models/postLike';
import { ResponseDataListModel, ResponseDataModel } from 'src/models/responseDataModel';
import { ResponseModel } from 'src/models/responseModel';
import { Post } from "../../models/post";
import { CategoryService } from './category.service';
import { CommentService } from './comment.service';
import { LoadingService } from './loading.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];
  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient,
    private commentService: CommentService,
    private loadingService: LoadingService,
    private userService: UserService,
    private categoryService: CategoryService
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
  async getAll() {
    await this.loadingService.showLoading("Yükleniyor.");
    let url = `${this.baseUrl}/api/posts`;
    this.http.get<ResponseDataListModel<Post>>(url).subscribe(async response => {
      if (response.success) {
        this.posts = response.data;
        this.posts.forEach(post => {
          this.getLikes(post.id).subscribe(getLikeResponse => {
            post.likes = getLikeResponse.data.count;
          })
          this.commentService.getAllByPostId(post.id).subscribe(response => {
            post.commentCount = response.data.length;
          })
          this.userService.getUserById(post.userId).subscribe(response => {
            if (response.success) {
              post.user = response.data;
            }
          })
          this.categoryService
        })
        await this.loadingService.closeLoading();
      }
    })
  }

  getLikes(postId: number) {
    let url = `${this.baseUrl}/api/postlikes/${postId}`;
    return this.http.get<ResponseDataModel<{ count: number }>>(url);
  }
  addLike(postId: number, userId: number) {
    let url = `${this.baseUrl}/api/addpostlikes`
    return this.http.post<ResponseModel>(url,
      { postId: postId, userId: userId })
  }
  deleteLike(postId: number, userId: number) {
    let url = `${this.baseUrl}/api/deletepostlikes`
    return this.http.post<ResponseModel>(url,
      { postId: postId, userId: userId })
  }
}
