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
  private url = environment.baseUrl + '/cnf_enquiry/';

  addConfirmEnquiry(cnfEnq) {
    return this.http
      .patch(
        this.url + cnfEnq.enquiry_id + '/',
        cnfEnq,
        { headers: this.header });
  }

}
