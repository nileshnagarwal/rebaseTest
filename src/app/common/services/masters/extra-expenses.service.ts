import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtraExpenses } from '../../interfaces/extra-expenses';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExtraExpensesService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = environment.baseUrl + '/masters/extraexpenses/';

  getExtraExpenses(): Observable<HttpResponse<ExtraExpenses[]>> {
    return this.http
      .get<ExtraExpenses[]>(this.url,
      {
        observe: 'response',
        headers: this.header,
      });
  }
}
