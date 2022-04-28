import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { KeyType, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storageService: StorageService
  ) { }

  async getUser() {
    let user: User = JSON.parse(await this.storageService.checkName(KeyType.User))
    return user;
  }
}
