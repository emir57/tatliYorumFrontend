import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  async close(data?: any) {
    this.modalController.dismiss(data);
  }

}
