import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { MessagePosition, MessageService } from 'src/app/services/message.service';
import { Complaint } from 'src/models/complaint';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {

  complaints: Complaint[] = []
  constructor(
    private complaintService: ComplaintService,
    private alertService: AlertService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getComplaints();
  }

  getComplaints() {
    this.complaintService.getAll().subscribe(response => {
      if (response.success) {
        this.complaints = response.data;
      }
    })
  }

  goPost(complaint: Complaint) {

  }

  deleteComplaint(complaint: Complaint) {
    this.alertService.showAlertConfirm("Silme işlemi", "Bu şikayeti silmek istediğinizden emin misiniz?",
      () => { },
      () => {
        this.complaintService.delete(complaint.id).subscribe(response => {
          if (response.success) {
            this.messageService.showMessage(response.message, { position: MessagePosition.Top })
          } else {
            this.messageService.showMessage(response.message, { position: MessagePosition.Top })
          }
        })
      })
  }

}
