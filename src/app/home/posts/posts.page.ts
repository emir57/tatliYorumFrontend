import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPage } from 'src/app/comments/comments.page';
import { AlertService } from 'src/app/services/alert.service';
import { ApplicationService } from 'src/app/services/application.service';
import { CommentService } from 'src/app/services/comment.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { KeyType, StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ApplicationSettings } from 'src/models/applicationSettings';
import { Post } from 'src/models/post';
import { User } from 'src/models/user';
declare var $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  currentUser: User
  posts: Post[]
  constructor(
    private postService: PostService,
    private loadingService: LoadingService,
    private userService: UserService,
    private alertService: AlertService,
    private messageService: MessageService,
    private applicationService: ApplicationService,
    private modalController: ModalController,
    private commentService: CommentService
  ) { }

  async ngOnInit() {
    await this.applicationService.getApplicationSettings();
    this.getCurrentUser();
    this.getPosts();
  }

  async doRefresh(event) {
    await this.getPosts();
    event.target.complete();
  }

  async getPosts() {
    await this.loadingService.showLoading("Yükleniyor.");
    this.postService.getAll().subscribe(async response => {
      if (response.success) {
        this.posts = response.data;
        this.posts.forEach(post => {
          this.postService.getLikes(post.id).subscribe(getLikeResponse => {
            post.likes = getLikeResponse.data.count;
          })
          this.commentService.getAllByPostId(post.id).subscribe(response => {
            post.commentCount = response.data.length;
          })
        })
        await this.loadingService.closeLoading();
      }
    })
  }
  async getCurrentUser() {
    this.currentUser = await this.userService.getUser();
  }

  getColorStyles(post: Post) {
    let css = `
    color:${post.textColor};
    background:${post.backgroundColor};`
    if (post.isAnimation && this.applicationService.applicationSettings.enableAnimation) {
      css += "animation:animation 5s infinite";
    }
    return css;
  }
  addLike(postId: number) {
    this.postService.addLike(postId, this.currentUser.id).subscribe(response => {
      if (response.success) {
        let postIndex = this.posts.findIndex(p => p.id === postId);
        this.posts[postIndex].likes += 1;
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      } else {
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      }
    })
  }
  deleteLike(postId: number) {
    this.postService.deleteLike(postId, this.currentUser.id).subscribe(response => {
      if (response.success) {
        let postIndex = this.posts.findIndex(p => p.id === postId);
        this.posts[postIndex].likes -= 1;
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      } else {
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      }
    })
  }

  async showComments(post: Post) {
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: { post: post, currentUser: this.currentUser }
    })

    return await modal.present();
  }


  showSettings(post: Post) {
    const settingsPanel = $("#postsetting" + post.id);
    settingsPanel.fadeToggle();
  }

  deletePost(post: Post) {
    post.isAnimation = false;
    const postCard = $("#postcard" + post.id);
    let interval = setInterval(() => {
      setTimeout(() => {
        postCard.addClass("bg-warning");
      }, 500);
      setTimeout(() => {
        postCard.removeClass("bg-warning");
      }, 1350);
    }, 500)
    this.alertService.showAlertConfirm(
      "Silme işlemi",
      "Bu gönderinizi silmek istediğinizden eminmisiniz",
      () => {
        post.isAnimation = true;
        clearInterval(interval);
      },
      () => {

      })
  }

}
