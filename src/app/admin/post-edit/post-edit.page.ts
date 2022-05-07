import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private messageService: MessageService,
    private postService: PostService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  async close() {
    await this.modalController.dismiss();
  }

}
