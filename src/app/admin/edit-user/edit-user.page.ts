import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from "../../../models/user";
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  @Input() user: User;
  form: FormGroup;
  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [this.user.id],
      username: [this.user.username, [Validators.required, Validators.maxLength(30)]],
      email: [this.user.email, [Validators.required, Validators.maxLength(50)]],
      isAdmin: [this.user.isAdmin, []]
    })
  }

  async close(data?: any) {
    this.modalController.dismiss(data);
  }

}
