import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/products'; // Backend API

  constructor(private http: HttpClient) {}

  // Upload product with image
  addProduct(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  // Fetch all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
