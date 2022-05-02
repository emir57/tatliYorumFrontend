import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post } from 'src/models/post';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  @Input() post: Post;
  constructor(
    private modalController: ModalController,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    console.log(this.post)
  }

  async close() {
    await this.modalController.dismiss();
  }

}
