import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  isLoad: boolean = true;
  loginForm: FormGroup
  email: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private storageService: StorageService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEmail();
    this.createForm();

  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required]]
    })
  }
  getEmail() {
    this.activatedRoute.params.subscribe(param => {
      if (param["email"]) {
        this.email = param["email"]
      }
    })
  }


  async login() {
    if (this.loginForm.valid) {
      this.isLoad = false;
      await this.loadingService.showLoading("Giriş yapılıyor lütfen bekleyiniz.")
      let user = this.loginForm.value;
      this.authService.login(user).subscribe(async response => {
        if (response.success) {
          this.messageService.showMessage(response.message, {});
          setTimeout(async () => {
            this.isLoad = true;
            await this.loadingService.closeLoading();
            this.router.navigateByUrl("/home/posts");
          }, 1000);
        } else {
          this.isLoad = true;
          await this.loadingService.closeLoading();
          this.messageService.showMessage(response.message, {});
        }
      })
    }
  }

}
