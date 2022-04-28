import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  }


  add() {
    if (this.saveForm.valid) {
      let post: Post = Object.assign({}, this.saveForm.value);
      console.log(post)
    }
  }

}
