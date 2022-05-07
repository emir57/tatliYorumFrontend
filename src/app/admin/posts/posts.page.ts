import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CommentService } from 'src/app/services/comment.service';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  constructor(
    public postService: PostService,
    private alertService: AlertService,
    private modalController: ModalController,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAll();
  }

  editPost(post: Post) {

  }
  deletePost(post: Post) {
    this.alertService.showAlertConfirm("Silme işlemi", "Bu gönderiyi silmek istediğinizden emin misiniz?",
      () => { },
      () => {
        this.postService.delete(post.id).subscribe(response => {
          if (response.success) {
            this.messageService.showMessage(response.message, { position: MessagePosition.Top });
          } else {
            this.messageService.showMessage(response.message, { position: MessagePosition.Top });
          }
        })
      })
  }
}
