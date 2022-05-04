import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { RoleService } from 'src/app/services/role.service';
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
    private messageService: MessageService,
    private authService: AuthService,
    private alertService: AlertService,
    public roleService: RoleService
  ) { }

  async ngOnInit() {
    await this.roleService.checkIsAdmin();
    await this.applicationService.getApplicationSettings();
    this.applicationSettings = this.applicationService.applicationSettings;
  }

  goAdminPanel() {
    this.router.navigateByUrl("/admin/home");
  }

  async save() {
    //TODO: refactoring. Output
    await this.applicationService.setApplicationSettings(this.applicationSettings);
    this.messageService.showMessage("Kaydetme başarılı lütfen bekleyiniz", { position: MessagePosition.Middle });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  async logout() {
    this.alertService.showAlertConfirm("Çıkış", "Çıkış yapmak istediğinizden emin misiniz?",
      () => { },
      async () => {
        await this.authService.logout();
      })
  }

}
