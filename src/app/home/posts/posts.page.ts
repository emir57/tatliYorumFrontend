import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPage } from 'src/app/comments/comments.page';
import { AlertService } from 'src/app/services/alert.service';
import { ApplicationService } from 'src/app/services/application.service';
import { CommentService } from 'src/app/services/comment.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { KeyType, StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ApplicationSettings } from 'src/models/applicationSettings';
import { Complaint } from 'src/models/complaint';
import { Post } from 'src/models/post';
import { User } from 'src/models/user';
declare var $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit, AfterViewInit {

  currentUser: User
  posts: Post[]
  constructor(
    public postService: PostService,
    private loadingService: LoadingService,
    private userService: UserService,
    private alertService: AlertService,
    private messageService: MessageService,
    private applicationService: ApplicationService,
    private modalController: ModalController,
    private commentService: CommentService,
    private complaintService: ComplaintService
  ) { }
  async ngOnInit() {
    await this.applicationService.getApplicationSettings();
    this.getCurrentUser();
    this.getPosts();
  }

  ngAfterViewInit(): void {
    this.downArrowAnimation();
  }

  async doRefresh(event) {
    const text = $("#refreshtext");
    text.hide();
    await this.getPosts();
    setTimeout(() => {
      event.target.complete();
    }, 500);
    setTimeout(() => {
      text.fadeIn();
    }, 1000);
  }

  async getPosts() {
    this.postService.getAll()
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
        let postIndex = this.postService.posts.findIndex(p => p.id === postId);
        this.postService.posts[postIndex].likes += 1;
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      } else {
        this.messageService.showMessage(response.message, { position: MessagePosition.Top });
      }
    })
  }
  deleteLike(postId: number) {
    this.postService.deleteLike(postId, this.currentUser.id).subscribe(response => {
      if (response.success) {
        let postIndex = this.postService.posts.findIndex(p => p.id === postId);
        this.postService.posts[postIndex].likes -= 1;
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

  sortByLike() {
    this.postService.posts.sort((x,y)=>(new Date(x.createdDate)).getTime()-(new Date(y.createdDate)).getTime());
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

  downArrowAnimation() {
    const downArrow = $("#downarrow");
    downArrow.fadeIn();
    setInterval(() => {
      setTimeout(() => {
        setTimeout(() => {
          setTimeout(() => {
            downArrow.animate({
              marginTop: "10px"
            }, 500)
          }, 100);
        }, 100);
        // downArrow.fadeIn();
      }, 500);
      setTimeout(() => {
        downArrow.animate({
          marginTop: "0px"
        }, 500)
        // downArrow.fadeOut();
      }, 1000);
    }, 1000)
  }

}
