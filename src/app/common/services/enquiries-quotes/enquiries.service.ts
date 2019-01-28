import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Enquiry } from '../../interfaces/enquiry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnquiriesService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = 'http://127.0.0.1:8000/enquiry/';

  addEnquiry(enquiry: Enquiry) {
    return this.http
      .post(
        this.url,
        enquiry,
        { headers: this.header });

  }

  getEnquiry(): Observable<HttpResponse<Enquiry[]>>  {
    return this.http
      .get<Enquiry[]>(this.url,
        {
          observe: 'response',
          headers: this.header,
        });
    }

  getEnquiryById(id) {
    return this.http
      .get(
        this.url + id + '/',
        { headers: this.header },
      );
  }

  deleteEnquiry(data) {
    // We receive data object which is a part of the event object
    // passed by the event emitter of smart table. This data object
    // has the data of the field, out of which we can extract the
    // enquiry_id.
    const id = data['enquiry_id'];
    return this.http
      .delete(
        this.url + id + '/',
        { headers: this.header },
      );
  }

  editEnquiry(
    enquiry: Enquiry,
    id: number) {
    return this.http
      .put(
        this.url + id + '/',
        enquiry,
        { headers: this.header },
      );
  }
}
