import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { VehicleBody } from '../../interfaces/vehicle-body';

@Injectable()
export class VehicleBodyService {

  constructor(private http: HttpClient) {
    // this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = 'http://127.0.0.1:8000/masters/vehiclebody/';

  addVehicleBody(vehicleBody) {
    console.log(vehicleBody);
    return this.http
      .post(
        this.url,
        vehicleBody,
        { headers: this.header });

  }

  getVehicleBody(): Observable<HttpResponse<VehicleBody[]>> {
    return this.http
      .get<VehicleBody[]>(
        this.url,
        { 
          observe: 'response', 
          // headers: this.header 
        },
      );
  }

  updateVehicleBody(vehicleBody) {
    const id = vehicleBody['vehicle_body_id'];
    return this.http
      .put(
        this.url + id + '/',
        vehicleBody,
        { headers: this.header });
  }

  deleteVehicleBody(data) {
    // We receive data object which is a part of the event object
    // passed by the event emitter of smart table. This data object
    // has the data of the field, out of which we can extract the
    // vehicle_body_id.
    const id = data['vehicle_body_id'];
    return this.http
      .delete(
        this.url + id + '/',
        { headers: this.header },
      );
  }
}
