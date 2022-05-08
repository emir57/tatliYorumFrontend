import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostPage } from 'src/app/home/post/post.page';
import { AlertService } from 'src/app/services/alert.service';
import { MessageService } from 'src/app/services/message.service';
import { PostLikeService } from 'src/app/services/post-like.service';
import { PostLike } from 'src/models/postLike';
declare var $: any;

@Component({
  selector: 'app-postlikes',
  templateUrl: './postlikes.page.html',
  styleUrls: ['./postlikes.page.scss'],
})
export class PostlikesPage implements OnInit {

  postLikes: PostLike[];
  constructor(
    private postLikeService: PostLikeService,
    private modalController: ModalController,
    private alertService: AlertService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getPostLikes();
  }

  getPostLikes() {
    this.postLikeService.getAll().subscribe(response => {
      if (response.success) {
        this.postLikes = response.data;
      }
    })
  }

  async goPost(postLike: PostLike) {
    const card = $("#postlike" + postLike.id);
    card.addClass("bg-info text-white");
    const modal = await this.modalController.create({
      component: PostPage,
      componentProps: { postId: postLike.postId }
    })
    modal.onDidDismiss().then(() => {
      card.removeClass("bg-info text-white");
    })

    return await modal.present();
  }
  deletePostLike(postLike: PostLike) {
    const card = $("#postlike" + postLike.id);
    card.addClass("bg-danger text-white");
    this.alertService.showAlertConfirm("Silme İşlemi",
      "Bu beğeniyi silmek istediğinizden emin misiniz?",
      () => {
        card.removeClass("bg-danger text-white");
      }, () => {
        card.removeClass("bg-danger text-white");
        this.postLikeService.delete(postLike.id).subscribe(response => {
          if (response.success) {
            this.messageService.showMessage(response.message, {});
          } else {
            this.messageService.showMessage(response.message, {});
          }
        })
      })
  }

}
