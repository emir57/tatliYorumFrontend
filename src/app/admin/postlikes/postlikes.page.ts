import { Component, OnInit } from '@angular/core';
import { PostLikeService } from 'src/app/services/post-like.service';
import { PostLike } from 'src/models/postLike';

@Component({
  selector: 'app-postlikes',
  templateUrl: './postlikes.page.html',
  styleUrls: ['./postlikes.page.scss'],
})
export class PostlikesPage implements OnInit {

  postLikes: PostLike[];
  constructor(
    private postLikeService: PostLikeService
  ) { }

  ngOnInit() {
  }

}
