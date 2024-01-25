import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from './env';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategoriesByUserId(id: string | null) {
    return this.http.get<any>(`${url}/api/category/user/${id}`);
  }

  getCategoryById(id: number) {
    return this.http.get<any>(`${url}/api/category/${id}`);
  }

  addCategory(id: string | null, name: string) {
    return this.http.post<any>(`${url}/api/category/`, { user_id: id, name: name });
  }

  editCategory(id: number, name: string) {
    return this.http.put<any>(`${url}/api/category/`, { id: id, name: name });
  }

  deleteCategory(id: number) {
    return this.http.delete<any>(`${url}/api/category/${id}`);
  }
}
