import { Component, OnInit } from '@angular/core';
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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getPosts();
  }

  getPosts() {
    this.postService.getAll().subscribe(response => {
      console.log(response.data)
      if (response.success) {
        this.posts = response.data;
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

  }

}
