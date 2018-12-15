import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Transporter } from '../../interfaces/transporter';
import { HttpClient, HttpResponse } from '../../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../../node_modules/rxjs';


@Injectable()
export class TransporterService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = 'http://127.0.0.1:8000/masters/transporter/';

  addTransporter(transporter: Transporter) {
    return this.http
      .post(
        this.url,
        transporter,
        { headers: this.header });

  }

  getTransporter(): Observable<HttpResponse<Transporter[]>>  {
    return this.http
      .get<Transporter[]>(this.url,
        {
          observe: 'response',
          headers: this.header,
        });
    }

  getTransporterById(id) {
    return this.http
      .get(
        this.url + id + '/',
        { headers: this.header },
      );
  }

  deleteTransporter(data) {
    // We receive data object which is a part of the event object
    // passed by the event emitter of smart table. This data object
    // has the data of the field, out of which we can extract the
    // transporter_id.
    const id = data['transporter_id'];
    return this.http
      .delete(
        this.url + id + '/',
        { headers: this.header },
      );
  }

  editTransporter(
    transporter: Transporter,
    id: number) {
    return this.http
      .put(
        this.url + id + '/',
        transporter,
        { headers: this.header },
      );
  }
}
