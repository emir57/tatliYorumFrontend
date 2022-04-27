import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    })
  }


  register() {

  }

}
