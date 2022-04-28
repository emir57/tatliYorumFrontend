import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'src/app/services/message.service';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.page.html',
  styleUrls: ['./post-add.page.scss'],
})
export class PostAddPage implements OnInit {

  saveForm: FormGroup;
  isLoad: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService
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

  add() {
    if (this.saveForm.valid) {
      let post: Post = Object.assign({}, this.saveForm.value);
      console.log(post)
    }
  }

}
