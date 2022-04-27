import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
  ) { }

  async setName(key: KeyType, value: string) {
    await Storage.set({
      key: key,
      value: value
    })
  }
}
export enum KeyType {
  User = "tatliYorum_user"
}
