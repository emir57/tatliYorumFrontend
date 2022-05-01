import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private applicationService: ApplicationService
  ) { }

  async ngOnInit() {
    await this.applicationService.getApplicationSettings();
  }

}
