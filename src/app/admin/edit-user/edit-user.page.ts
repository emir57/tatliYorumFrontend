import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  form: FormGroup;
  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  async close(data?: any) {
    this.modalController.dismiss(data);
  }

}
