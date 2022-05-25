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
    $("#sortByLikeBtn").removeClass("text-success");
    $("#sortByDateBtn").removeClass("text-success");
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

  sortByLike() {
    $("#sortByDateBtn").removeClass("text-success");
    $("#sortByLikeBtn").addClass("text-success");
    this.postService.posts.sort((x, y) => y.likes - x.likes);
  }
  sortByDate() {
    $("#sortByDateBtn").addClass("text-success");
    $("#sortByLikeBtn").removeClass("text-success");
    this.postService.posts.sort((x, y) => (new Date(y.createdDate)).getTime() - (new Date(x.createdDate)).getTime());
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
    }, 1100)
  }

  getDate(date: Date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
