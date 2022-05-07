import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.page.html',
  styleUrls: ['./comment-edit.page.scss'],
})
export class CommentEditPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private commentService: CommentService
  ) { }

  ngOnInit() {
  }

  async close() {
    await this.modalController.dismiss();
  }

}
