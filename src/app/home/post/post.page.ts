import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPage } from 'src/app/comments/comments.page';
import { AlertService } from 'src/app/services/alert.service';
import { ApplicationService } from 'src/app/services/application.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Complaint } from 'src/models/complaint';
import { Post } from 'src/models/post';
import { User } from 'src/models/user';
declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  @Input() postId: number;
  post: Post;
  currentUser: User;
  constructor(
    private postService: PostService,
    private modalController: ModalController,
    private messageService: MessageService,
    private userService: UserService,
    private applicationService: ApplicationService,
    private complaintService: ComplaintService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    await this.applicationService.getApplicationSettings();
    this.getCurrentUser();
    this.getPost();
  }

  async close() {
    await this.modalController.dismiss();
  }
  getPost() {
    this.postService.getById(this.postId).subscribe(response => {
      if (response.success) {
        this.post = response.data;
      }
    })
  }
  async getCurrentUser() {
    this.currentUser = await this.userService.getUser();
  }
  addLike(post: Post) {
    this.postService.addLike(post.id, this.currentUser.id).subscribe(response => {
      if (response.success) {
        let postIndex = this.postService.posts.findIndex(p => p.id === post.id);
        this.postService.posts[postIndex].likes += 1;
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      } else {
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      }
    })
  }
  deleteLike(post: Post) {
    if (post.likes === 0) return;
    this.postService.deleteLike(post.id, this.currentUser.id).subscribe(response => {
      if (response.success) {
        let postIndex = this.postService.posts.findIndex(p => p.id === post.id);
        this.postService.posts[postIndex].likes -= 1;
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      } else {
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      }
    })
  }
  getColorStyles() {
    let css = `
    color:${this.post.textColor};
    background:${this.post.backgroundColor};`
    if (this.post.isAnimation && this.applicationService.applicationSettings.enableAnimation) {
      css += "animation:animation 5s infinite";
    }
    return css;
  }
  getDownArrowClass() {
    return this.post.likes == 0 ? `text-danger` : "";
  }
  showSettings() {
    const settingsPanel = $("#postsetting" + this.post.id);
    settingsPanel.fadeToggle();
  }
  complaintPost() {
    this.alertService.showAlertWithInput("Bu Gönderiyi Şikayet Et",
      () => { },
      (value) => {
        console.log(value.content);
        let complaintModel: Complaint = {
          content: value.content,
          postId: this.post.id,
          userId: this.currentUser.id
        };
        this.complaintService.add(complaintModel).subscribe(response => {
          if (response.success) {
            this.messageService.showMessage(response.message, { position: MessagePosition.Top });
          } else {
            this.messageService.showMessage(response.message, { position: MessagePosition.Top });
          }
        })
      })
  }
  deletePost() {
    this.post.isAnimation = false;
    const postCard = $("#postcard" + this.post.id);
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
        this.post.isAnimation = true;
        clearInterval(interval);
      },
      () => {
        clearInterval(interval);
      })
  }

  async showComments(post: Post) {
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: { post: post, currentUser: this.currentUser }
    })

    return await modal.present();
  }

  getDate() {
    let date = new Date(this.post.createdDate);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }
}
