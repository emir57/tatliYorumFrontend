import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post } from 'src/models/post';
import { PostComment } from 'src/models/postComment';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  @Input() post: Post;
  comments: PostComment[]
  constructor(
    private modalController: ModalController,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.getComments();
  }

  async close() {
    await this.modalController.dismiss();
  }

  getComments() {
    this.commentService.getAllByPostId(this.post.id).subscribe(response => {
      if (response.success) {
        this.comments = response.data;
      }
    })
  }

}
