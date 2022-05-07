import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommentService } from 'src/app/services/comment.service';
import { PostComment } from 'src/models/postComment';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.page.html',
  styleUrls: ['./comment-edit.page.scss'],
})
export class CommentEditPage implements OnInit {

  @Input() comment: PostComment;
  saveForm: FormGroup
  constructor(
    private modalController: ModalController,
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  async close() {
    await this.modalController.dismiss();
  }

  edit() {
    if (this.saveForm.valid) {

    }
  }

}
