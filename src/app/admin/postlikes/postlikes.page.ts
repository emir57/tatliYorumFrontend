import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostPage } from 'src/app/home/post/post.page';
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
    private modalController: ModalController
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

  }

}
