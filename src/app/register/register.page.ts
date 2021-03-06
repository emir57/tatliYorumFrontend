import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isLoad: boolean = true;
  registerForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ["", [Validators.required]],
      rePassword: ["", [Validators.required]]
    }, { validators: this.checkPasswords })
  }


  async register() {
    if (this.registerForm.valid) {
      await this.loadingService.showLoading("Kayıt olunuyor lütfen bekleyiniz.");
      this.isLoad = false;
      let userModel = this.registerForm.value;
      delete userModel.rePassword;
      this.authService.register(userModel).subscribe(async response => {
        this.isLoad = true;
        await this.loadingService.closeLoading();
        if (response.success) {
          this.messageService.showMessage(response.message, {});
          this.router.navigate(["/login", { email: userModel.email }])
        } else {
          this.messageService.showMessage(response.message, {});
        }
      })
    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get("password").value;
    let confirmPassword = group.get("rePassword").value;
    return password === confirmPassword ? null : { notSame: true };
  }

  get username() {
    return this.registerForm.get("username");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get rePassword() {
    return this.registerForm.get("rePassword");
  }

}
