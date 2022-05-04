import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  exitPanel() {
    this.alertService.showAlertConfirm("Çıkış",
      "Admin panelinden çıkmak üzeresiniz",
      () => { },
      () => {
        this.router.navigateByUrl("/home/settings");
      })
  }

}
