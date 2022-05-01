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

  async removeName(key: KeyType) {
    await Storage.remove({
      key: key
    });
  }
}
export enum KeyType {
  User = "tatliYorum_user",
  ApplicationSettings = "tatliYorum_appSettings"
}
