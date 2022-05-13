import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/models/post';
import { User } from 'src/models/user';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {

  currentUser: User;
  @Input() post: Post;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    this.currentUser = await this.userService.getUser();
  }

}
