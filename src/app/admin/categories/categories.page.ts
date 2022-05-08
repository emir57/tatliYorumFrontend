import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'src/app/services/message.service';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: Category[]
  constructor(
    private categoryService: CategoryService,
    private alertService: AlertService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(response => {
      if (response.success) {
        this.categories = response.data;
      }
    })
  }

  editCategory(category: Category) {

  }
  deleteCategory(category: Category) {

  }

}
