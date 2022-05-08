import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'src/app/services/message.service';
import { Category } from 'src/models/category';
declare var $: any;

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
    const card = $("#category" + category.id);
    card.addClass("bg-warning text-white");
    this.alertService.showAlertConfirm("Silme işlemi",
      `"${category.name}" bu kategoriyi silmek istediğinizden emin misiniz?`,
      () => {
        card.removeClass("bg-warning text-white");
      },
      () => {
        card.removeClass("bg-warning text-white");
      })
  }

}
