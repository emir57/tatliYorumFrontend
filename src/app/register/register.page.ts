import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
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


  register() {

  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get("password").value;
    let confirmPassword = group.get("rePassword").value;
    return password === confirmPassword ? null : { notSame: true };
  }

  get username(){
    return this.registerForm.get("username");
  }
  get email(){
    return this.registerForm.get("email");
  }
  get password(){
    return this.registerForm.get("password");
  }
  get rePassword(){
    return this.registerForm.get("rePassword");
  }

}
