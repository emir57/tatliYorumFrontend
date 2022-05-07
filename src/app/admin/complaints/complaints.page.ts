import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service';
import { Complaint } from 'src/models/complaint';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {

  complaints: Complaint[] = []
  constructor(
    private complaintService: ComplaintService
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

}
