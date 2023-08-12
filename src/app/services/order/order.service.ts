import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http'
import { environment } from "src/environments/envrionments";
import { Order } from "src/app/models/order";
import { CustomResponse } from "src/app/models/response";

@Injectable({
  providedIn: 'root'
})
export class OrderService
{
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  submitOrder(o : Order)
  {
    return this.http.post<CustomResponse>(`${this.apiUrl}Order/SubmitOrder/`, o);
  }
}
