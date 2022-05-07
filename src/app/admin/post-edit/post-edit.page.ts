import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {

  @Input() post: Post;
  saveForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private messageService: MessageService,
    private postService: PostService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.saveForm = this.formBuilder.group({
      id: [this.post.id],
      content: [this.post.content, [Validators.required]],
      categoryId: [this.post.categoryId, [Validators.required]],
      userId: [this.post.userId, [Validators.required]],
      isAnimation: [this.post.isAnimation, [Validators.required]],
      backgroundColor: [this.post.backgroundColor, [Validators.required]],
      textColor: [this.post.textColor, [Validators.required]],
      secretUser: [this.post.secretUser, [Validators.required]]
    })
  }

  async close() {
    await this.modalController.dismiss();
  }

}
