import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post } from 'src/models/post';
import { PostComment } from 'src/models/postComment';
import { User } from 'src/models/user';
import { CommentService } from '../services/comment.service';
import { MessagePosition, MessageService } from '../services/message.service';
declare var $: any;
@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  @Input() post: Post;
  @Input() currentUser: User;
  comments: PostComment[] = undefined;
  constructor(
    private modalController: ModalController,
    private commentService: CommentService,
    private messageService: MessageService
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
    let value = $("#commentinput").val();
    let commentModel: PostComment = {
      id: 2,
      content: value.trim(),
      createdDate: (new Date).toDateString(),
      postId: this.post.id,
      userId: this.currentUser.id
    };
    this.comments.push(Object.assign({ username: this.currentUser.username }, commentModel))
    delete commentModel.id;
    this.commentService.add(commentModel).subscribe(response => {
      if (response.success) {
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      }
    })
  }

  getDate(dateString: string) {
    console.log(dateString)
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

}
