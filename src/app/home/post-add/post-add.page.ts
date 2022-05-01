import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/models/category';
import { Post } from 'src/models/post';
import { User } from 'src/models/user';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.page.html',
  styleUrls: ['./post-add.page.scss'],
})
export class PostAddPage implements OnInit {

  animation: boolean = false;
  secretUser: boolean = false;
  content: string;
  choosedBackgroundColor: string = "#EDF0F3";
  choosedTextColor: string = "#000000";
  user: User
  saveForm: FormGroup;
  isLoad: boolean = true;
  categories: Category[];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private postService: PostService,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getUser();
    this.createForm();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(response => {
      if (response.success) {
        this.categories = response.data;
      }
    })
  }

  async getUser() {
    this.user = await this.userService.getUser();
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

  add() {
    if (this.saveForm.valid) {
      let post: Post = Object.assign({}, this.saveForm.value);
      this.postService.add(post).subscribe(response => {
        if (response.success) {
          this.messageService.showMessage(response.message, {});
          this.router.navigateByUrl("/home/posts")
        } else {
          this.messageService.showMessage(response.message, {});
        }
      })
    }
  }

  getColorStyles() {
    let css = `
    color:${this.choosedTextColor};
    background:${this.choosedBackgroundColor};`
    if (this.animation) {
      css += "animation:animation 5s infinite";
    }
    return css;
  }
}
