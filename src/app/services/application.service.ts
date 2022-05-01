import { Injectable } from '@angular/core';
import { ApplicationSettings } from 'src/models/applicationSettings';
import { KeyType, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  applicationSettings: ApplicationSettings;
  constructor(
    private storageService: StorageService
  ) {
    this.getApplicationSettings();
  }

  async getApplicationSettings() {
    this.applicationSettings = JSON.parse(await this.storageService.checkName(KeyType.ApplicationSettings))
  }
  async setApplicationSettings(appSetting: ApplicationSettings) {
    await this.storageService.setName(KeyType.ApplicationSettings, JSON.stringify(appSetting));
  }
}
