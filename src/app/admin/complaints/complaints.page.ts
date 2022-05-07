import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PostPage } from 'src/app/home/post/post.page';
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
    private messageService: MessageService,
    private router: Router,
    private modalController: ModalController
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

  async goPost(complaint: Complaint) {
    const modal = await this.modalController.create({
      component: PostPage,
      componentProps: { postId: complaint.postId }
    })

    return await modal.present();
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
