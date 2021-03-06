import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationSettings } from 'src/models/applicationSettings';
import { ApplicationService } from '../services/application.service';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';
import { RoleService } from '../services/role.service';
import { KeyType, StorageService } from '../services/storage.service';

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
    private router: Router,
    private applicationService: ApplicationService,
    private roleService: RoleService
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
          await this.storageService.setName(KeyType.User, JSON.stringify(response.data));
          this.roleService.checkIsAdmin();
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
      }, (responseErr: Response) => {
        if (responseErr.status === 0) {
          this.messageService.showMessage("Sunucuya bağlanılamadı!", {});
        }
        this.isLoad = true;
      })
    }
  }

}
