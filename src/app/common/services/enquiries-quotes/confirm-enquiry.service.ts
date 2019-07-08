import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfirmEnquiryService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = environment.baseUrl + '/con_enquiry/';

  addConfirmEnquiry(cnfEnq) {
    return this.http
      .post(
        this.url,
        cnfEnq,
        { headers: this.header });
  }

}
