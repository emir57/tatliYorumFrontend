import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
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
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getPosts();
  }

  async getPosts() {
    await this.loadingService.showLoading("Yükleniyor.");
    this.postService.getAll().subscribe(async response => {
      console.log(response.data)
      if (response.success) {
        this.posts = response.data;
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
    if (post.isAnimation) {
      css += "animation:animation 5s infinite";
    }
    return css;
  }


  showSettings(post: Post) {
    const settingsPanel = $("#postsetting" + post.id);
    settingsPanel.fadeToggle();
  }

  deletePost(post: Post) {
    post.isAnimation = false;
    this.alertService.showAlertConfirm(
      "Silme işlemi",
      "Bu gönderinizi silmek istediğinizden eminmisiniz",
      () => {
        post.isAnimation = true;
      },
      () => {

      })
  }

}
