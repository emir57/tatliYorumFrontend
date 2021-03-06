import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostPage } from 'src/app/home/post/post.page';
import { AlertService } from 'src/app/services/alert.service';
import { CommentService } from 'src/app/services/comment.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { PostComment } from 'src/models/postComment';
import { CommentEditPage } from '../comment-edit/comment-edit.page';
declare var $: any;

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  comments: PostComment[];
  constructor(
    private alertService: AlertService,
    private commentService: CommentService,
    private messageService: MessageService,
    private modalController: ModalController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.commentService.getAll().subscribe(response => {
      if (response.success) {
        this.comments = response.data;
        this.comments.forEach(comment => {
          this.userService.getUserById(comment.userId).subscribe(r => {
            comment.user = r.data;
          })
        })
      }
    })
  }

  async goPost(postId: number) {
    const modal = await this.modalController.create({
      component: PostPage,
      componentProps: { postId: postId }
    });

    return await modal.present();
  }

  deleteComment(comment: PostComment) {
    const card = $("#comment" + comment.id);
    card.addClass("bg-warning text-white");
    this.alertService.showAlertConfirm("Silme işlemi", "Bu yorumu silmek istediğinizden emin misiniz?",
      () => { card.removeClass("bg-warning text-white"); },
      () => {
        card.removeClass("bg-warning text-white");
        this.commentService.delete(comment.id).subscribe(response => {
          if (response.success) {
            this.deleteCommentInArray(comment.id);
            this.messageService.showMessage(response.message, {});
          } else {
            this.messageService.showMessage(response.message, {});
          }
        })
      })
  }

  async editComment(comment: PostComment) {
    const card = $("#comment"+comment.id);
    card.addClass("bg-danger text-white")
    const modal = await this.modalController.create({
      component: CommentEditPage,
      componentProps: { comment: comment }
    })
    modal.onDidDismiss().then(()=>{
      setTimeout(() => {
        card.removeClass("bg-danger text-white")
      }, 500);
    })

    return await modal.present();
  }

  deleteCommentInArray(commentId: number) {
    let index = this.comments.findIndex(x => x.id === commentId);
    this.comments.splice(index, 1);
  }

}
