import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CommentService } from 'src/app/services/comment.service';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/models/post';
import { PostEditPage } from '../post-edit/post-edit.page';
declare var $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  constructor(
    public postService: PostService,
    private alertService: AlertService,
    private modalController: ModalController,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAll();
  }

  async editPost(post: Post) {
    const postCard = $("#post"+post.id);
    postCard.addClass("bg-danger text-white");
    const modal = await this.modalController.create({
      component: PostEditPage,
      componentProps: { post: post }
    });
    modal.onDidDismiss().then(()=>{
      setTimeout(() => {
        postCard.removeClass("bg-danger text-white");
      }, 700);
    })

    return await modal.present();
  }
  deletePost(post: Post) {
    const postCard = $("#post" + post.id);
    postCard.addClass("bg-warning");
    this.alertService.showAlertConfirm("Silme işlemi", "Bu gönderiyi silmek istediğinizden emin misiniz?",
      () => { postCard.removeClass("bg-warning"); },
      () => {
        this.postService.delete(post.id).subscribe(response => {
          if (response.success) {
            this.messageService.showMessage(response.message, { position: MessagePosition.Top });
            this.deletePostInArray(post.id);
          } else {
            this.messageService.showMessage(response.message, { position: MessagePosition.Top });
          }
          postCard.removeClass("bg-warning");
        })
      })

  }
  deletePostInArray(postId: number) {
    let index = this.postService.posts.findIndex(x => x.id === postId);
    this.postService.posts.splice(index, 1);
  }
}
