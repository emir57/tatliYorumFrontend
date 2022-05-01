import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { ApplicationSettings } from 'src/models/applicationSettings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  applicationSettings: ApplicationSettings;
  constructor(
    private applicationService: ApplicationService
  ) { }

  async ngOnInit() {
    await this.applicationService.getApplicationSettings();
    this.applicationSettings = this.applicationService.applicationSettings;
  }

  async save(){
    await this.applicationService.setApplicationSettings(this.applicationSettings);
  }

}
