import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpResponse } from '../../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../../node_modules/rxjs';
import { VehicleType } from '../../interfaces/vehicle-type';
import { environment } from '../../../../environments/environment';

@Injectable()
export class VehicleTypeService {

  constructor(private http: HttpClient) {
    this.header = new Headers({ 'Content-Type': 'application/json' });
  }

  private header;
  private url = environment.baseUrl + '/masters/vehicletype/';

  addVehicleType(vehicleType) {
    return this.http
      .post(
        this.url,
        vehicleType,
        { headers: this.header });
  }

  getVehicleType(): Observable<HttpResponse<VehicleType[]>> {
    return this.http
      .get<VehicleType[]>(this.url,
      {
        observe: 'response',
        headers: this.header,
      });
  }

  deleteVehicleType(data) {
    // We receive data object which is a part of the event object
    // passed by the event emitter of smart table. This data object
    // has the data of the field, out of which we can extract the
    // vehicle_type_id.
    const id = data['vehicle_type_id'];
    return this.http
      .delete(
        this.url + id + '/',
        { headers: this.header },
      );
  }

}
