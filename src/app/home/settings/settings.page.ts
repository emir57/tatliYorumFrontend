import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { ApplicationSettings } from 'src/models/applicationSettings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  applicationSettings: ApplicationSettings;
  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    await this.applicationService.getApplicationSettings();
    this.applicationSettings = this.applicationService.applicationSettings;
  }

  async save() {
    await this.applicationService.setApplicationSettings(this.applicationSettings);
    this.messageService.showMessage("Kaydetme başarılı lütfen bekleyiniz", { position: MessagePosition.Middle });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
