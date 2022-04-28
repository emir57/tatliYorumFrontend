import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/models/post';
import { User } from 'src/models/user';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.page.html',
  styleUrls: ['./post-add.page.scss'],
})
export class PostAddPage implements OnInit {

  user: User
  saveForm: FormGroup;
  isLoad: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getUser();
    this.createForm();
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
      console.log(post)
    }
  }

}
