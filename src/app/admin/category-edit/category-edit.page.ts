import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {

  @Input() category: Category
  saveForm: FormGroup
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.saveForm = this.formBuilder.group({
      id: [this.category.id],
      name: [this.category.name, [Validators.required, Validators.maxLength(20)]]
    })
  }

  async close() {
    await this.modalController.dismiss();
  }

  edit() {
    if (this.saveForm.valid) {

    }
  }

}
