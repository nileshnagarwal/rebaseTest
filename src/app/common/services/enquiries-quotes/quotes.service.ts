import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Quote } from '../../interfaces/quote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = 'http://127.0.0.1:8000/quotes/';

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
        });
    }

  getQuoteById(id) {
    return this.http
      .get(
        this.url + id + '/',
        { headers: this.header },
      );
  }

  deleteQuote(data) {
    // We receive data object which is a part of the event object
    // passed by the event emitter of smart table. This data object
    // has the data of the field, out of which we can extract the
    // quote_id.
    const id = data['quote_id'];
    return this.http
      .delete(
        this.url + id + '/',
        { headers: this.header },
      );
  }

  editQuote(
    quote: Quote,
    id: number) {
    return this.http
      .put(
        this.url + id + '/',
        quote,
        { headers: this.header },
      );
  }
}
