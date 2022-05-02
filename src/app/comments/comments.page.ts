import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post } from 'src/models/post';
import { PostComment } from 'src/models/postComment';
import { User } from 'src/models/user';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  @Input() post: Post;
  @Input() currentUser: User;
  comments: PostComment[] = [];
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

  doComment() {

  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

}
