import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private storageService: StorageService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getEmail();

  }
  getEmail() {
    this.activatedRoute.params.subscribe(param => {
      if (param["email"]) {
        this.email = param["email"]
      }
    })
  }


  login() {

  }

}
