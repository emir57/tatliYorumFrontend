import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommentService } from 'src/app/services/comment.service';
import { MessageService } from 'src/app/services/message.service';
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
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.saveForm = this.formBuilder.group({
      content: ["", [Validators.required, Validators.maxLength(255)]]
    })
  }

  async close() {
    await this.modalController.dismiss();
  }

  edit() {
    if (this.saveForm.valid) {
      this.commentService.update(this.comment).subscribe(async response => {
        if (response.success) {
          this.messageService.showMessage(response.message, {});
          await this.modalController.dismiss();
        } else {
          this.messageService.showMessage(response.message, {});
        }
      })
    }
  }

}
