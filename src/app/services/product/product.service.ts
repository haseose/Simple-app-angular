import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http'
import { environment } from "src/environments/envrionments";
import { Product } from "src/app/models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService
{
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductList()
  {
    return this.http.get<Array<Product>>(`${this.apiUrl}Product/GetProduct`);
  }
}
