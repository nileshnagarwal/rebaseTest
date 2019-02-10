import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtraExpenses } from '../../interfaces/extra-expenses';

@Injectable({
  providedIn: 'root',
})
export class ExtraExpensesService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = 'http://127.0.0.1:8000/masters/extraexpenses/';

  getExtraExpenses(): Observable<HttpResponse<ExtraExpenses[]>> {
    return this.http
      .get<ExtraExpenses[]>(this.url,
      {
        observe: 'response',
        headers: this.header,
      });
  }
}
