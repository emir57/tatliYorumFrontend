import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { Category } from 'src/models/category';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {

  @Input() post: Post;
  saveForm: FormGroup;
  categories: Category[];
  constructor(
    private modalController: ModalController,
    private messageService: MessageService,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
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

  getCategories() {
    this.categoryService.getAll().subscribe(response => {
      if (response.success) {
        this.categories = response.data;
      }
    })
  }
  edit() {
    if (this.saveForm.valid) {
      let post: Post = this.saveForm.value;
      this.postService.update(post).subscribe(response => {
        if (response.success) {
          this.messageService.showMessage(response.message, {});
        } else {
          this.messageService.showMessage(response.message, {});
        }
      })
    }
  }

  async close() {
    await this.modalController.dismiss();
  }

}
