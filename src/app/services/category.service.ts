import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Category } from 'src/models/category';
import { ResponseDataListModel, ResponseDataModel } from 'src/models/responseDataModel';
import { ResponseModel } from 'src/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }


  getAll() {
    let url = `${this.baseUrl}/api/categories`;
    return this.http.get<ResponseDataListModel<Category>>(url);
  }
  getById(categoryId: number) {
    let url = `${this.baseUrl}/api/categories/${categoryId}`;
    return this.http.get<ResponseDataModel<Category>>(url);
  }
  add(category: Category) {
    let url = `${this.baseUrl}/api/categoryadd`;
    return this.http.post<ResponseModel>(url, category);
  }
  update(category: Category) {
    let url = `${this.baseUrl}/api/categoryedit`;
    return this.http.post<ResponseModel>(url, category);
  }
  delete(categoryId: number) {
    let url = `${this.baseUrl}/api/categorydelete/${categoryId}`;
    return this.http.delete<ResponseModel>(url);
  }
}
