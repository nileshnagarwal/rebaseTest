import { VehicleBodyService } from './../../common/services/masters/vehicle-body.service';
import { VehicleTypeService } from './../../common/services/masters/vehicle-type.service';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EnquiriesQuotesRoutingModule, routedComponents } from './enquiries-quotes-routing.module';
import { MaterialDesignModule } from '../../common/modules/material-design/material-design.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { EnquiriesService } from '../../common/services/enquiries-quotes/enquiries.service';

@NgModule({
  imports: [
    ThemeModule,
    EnquiriesQuotesRoutingModule,
    MaterialDesignModule,
    GooglePlaceModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    VehicleTypeService,
    VehicleBodyService,
    EnquiriesService,
  ],
})
export class EnquiriesQuotesModule { }
