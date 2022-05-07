import { Component, OnInit } from '@angular/core';
import { PostComment } from 'src/models/postComment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  comments: PostComment[];
  constructor() { }

  ngOnInit() {
  }

}
