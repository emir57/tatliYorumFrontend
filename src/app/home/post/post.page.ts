import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPage } from 'src/app/comments/comments.page';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/models/post';
import { User } from 'src/models/user';

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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getPost();
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

  async showComments(post: Post) {
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: { post: post, currentUser: this.currentUser }
    })

    return await modal.present();
  }

}
