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
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {

  currentUser: User;
  @Input() post: Post;
  constructor(
    private userService: UserService,
    private postService: PostService,
    private messageService: MessageService,
    private alertService: AlertService,
    private complaintService: ComplaintService,
    private modalController: ModalController,
    public applicationService: ApplicationService
  ) { }

  async ngOnInit() {
    await this.getCurrentUser();
    await this.applicationService.getApplicationSettings();
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

  getColorStyles(post: Post) {
    let css = `
    color:${post.textColor};
    background:${post.backgroundColor};`
    if (post.isAnimation && this.applicationService.applicationSettings.enableAnimation) {
      css += "animation:animation 5s infinite";
    }
    return css;
  }

  async showComments(post: Post) {
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: { post: post, currentUser: this.currentUser }
    })

    return await modal.present();
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
        clearInterval(interval);
      })
  }
  complaintPost(post: Post) {
    this.alertService.showAlertWithInput("Bu Gönderiyi Şikayet Et",
      () => { },
      (value) => {
        console.log(value.content);
        let complaintModel: Complaint = {
          content: value.content,
          postId: post.id,
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

  showSettings(post: Post) {
    const settingsPanel = $("#postsetting" + post.id);
    settingsPanel.fadeToggle();
  }

  getDownArrowClass(post: Post) {
    return post.likes == 0 ? `text-danger` : "";
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

}
