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
      content: ["", [Validators.required]],
      categoryId: ["", [Validators.required]],
      userId: ["", [Validators.required]],
      isAnimation: [false, [Validators.required]],
      backgroundColor: ["", [Validators.required]],
      textColor: ["", [Validators.required]],
      secretUser: [false, [Validators.required]]
    })
  }

  async close() {
    await this.modalController.dismiss();
  }

}
