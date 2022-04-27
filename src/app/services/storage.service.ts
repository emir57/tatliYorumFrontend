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

  async checkName(key: KeyType): Promise<string> {
    const { value } = await Storage.get({
      key: key
    });
    return value;
  }
}
export enum KeyType {
  User = "tatliYorum_user"
}
