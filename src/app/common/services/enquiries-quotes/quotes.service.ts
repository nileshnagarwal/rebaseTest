import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Quote } from '../../interfaces/quote';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = environment.baseUrl + '/quotes/';

  addQuote(quote: Quote) {
    return this.http
      .post(
        this.url,
        quote,
        { headers: this.header });
  }

  getQuote(): Observable<HttpResponse<Quote[]>>  {
    return this.http
      .get<Quote[]>(this.url,
        {
          observe: 'response',
          headers: this.header,
        },
      );
  }

  getQuoteById(id): Observable<HttpResponse<Quote[]>> {
    return this.http
      .get<Quote[]>(
        this.url + id + '/',
        {
          // observe: response gets the full response object.
          // Without this angular only takes response.body
          // as response.
          // Refer: https://alligator.io/angular/httpclient-intro/
          observe: 'response',
          headers: this.header,
        },
      );
  }

  /**The below service gets quotes for a given enquiry only */
  getQuoteByEnquiry(enquiry_id): Observable<HttpResponse<Quote[]>> {
    return this.http
      .get<Quote[]>(
        this.url + 'enquiry/' + enquiry_id + '/',
        {
          // observe: response gets the full response object.
          // Without this angular only takes response.body
          // as response.
          // Refer: https://alligator.io/angular/httpclient-intro/
          observe: 'response',
          headers: this.header,
        },
      );
  }
}
