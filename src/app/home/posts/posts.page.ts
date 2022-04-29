import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/models/post';
declare var $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: Post[]
  constructor(
    private postService: PostService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
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
    const settingsPanel = $("#postsetting"+post.id);
    settingsPanel.fadeIn();
  }

}
