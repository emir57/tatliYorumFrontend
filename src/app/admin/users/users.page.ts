import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';
import { EditUserPage } from '../edit-user/edit-user.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[] = [];
  constructor(
    private userService: UserService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll(
      (response) => {
        this.users = response.data;
      },
      () => { }
    );
  }

  async editUser(user: User) {
    const modal = await this.modalController.create({
      component: EditUserPage,
      componentProps: { user: user }
    });
    modal.onDidDismiss().then(value => {
      if (value.data) {
        this.updateUserInArray(value.data);
      }
    })

    return await modal.present();
  }

  updateUserInArray(user: User) {
    let i = this.users.findIndex(u => u.id === user.id);
    this.users[i] = user;
  }

}
