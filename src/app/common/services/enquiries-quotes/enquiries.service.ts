import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Enquiry } from '../../interfaces/enquiry';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EnquiriesSearch } from '../../interfaces/enquiry-search';

@Injectable({
  providedIn: 'root',
})
export class EnquiriesService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = environment.baseUrl + '/enquiry/';
  private searchUrl = environment.baseUrl + '/enquiry_search/';

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

  searchEnquiry(enquiriesSearch: EnquiriesSearch) {
    // Constructing Query Params
    const params = {};
    for (const key in enquiriesSearch) {
      // Check if null or ''
      if (enquiriesSearch[key] !== null &&
        enquiriesSearch[key] !== '') {
        // Check if Date
        if (enquiriesSearch[key] instanceof Date) {
          params[key] = enquiriesSearch[key].toISOString();
        } else if (enquiriesSearch[key] instanceof Number ||
          Array.isArray(enquiriesSearch[key])) {
            // Check if Number or Array
            params[key] = enquiriesSearch[key].toString();
        } else params[key] = enquiriesSearch[key];
      }
    }

    return this.http
      .get(
        this.searchUrl,
        {
          params: params,
          observe: 'response',
          headers: this.header,
        },
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
