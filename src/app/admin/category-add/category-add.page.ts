import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'src/app/services/message.service';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {

  saveForm: FormGroup;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.saveForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(20)]]
    })
  }

  add() {
    if (this.saveForm.valid) {
      let category: Category = this.saveForm.value;
      this.categoryService.add(category).subscribe(response => {
        if (response.success) {
          this.messageService.showMessage(response.message, {});
          setTimeout(() => {
            this.router.navigateByUrl("/admin/home");
          }, 100);
        } else {
          this.messageService.showMessage(response.message, {});
        }
      })
    }
  }

}
