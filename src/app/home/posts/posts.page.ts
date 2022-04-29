import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: Post[]
  constructor(
    private postService: PostService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  getPosts() {

  }

}
