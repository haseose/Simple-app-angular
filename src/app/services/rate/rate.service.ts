import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http'
import { environment } from "src/environments/envrionments";
import { Rate } from "src/app/models/rate";


@Injectable({
  providedIn: 'root'
})
export class RateService
{
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRateList()
  {
    return this.http.get<Array<Rate>>(`${this.apiUrl}Rate/GetRate`);
  }

  getCurrencyList()
  {
    return this.http.get<Array<string>>(`${this.apiUrl}Rate/GetCurrency`);
  }
}
