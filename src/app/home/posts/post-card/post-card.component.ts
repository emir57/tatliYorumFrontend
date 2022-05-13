import { Component, Input, OnInit } from '@angular/core';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
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
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
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

  showSettings(post: Post) {
    const settingsPanel = $("#postsetting" + post.id);
    settingsPanel.fadeToggle();
  }
  
  getDownArrowClass(post: Post) {
    return post.likes == 0 ? `text-danger` : "";
  }

}
