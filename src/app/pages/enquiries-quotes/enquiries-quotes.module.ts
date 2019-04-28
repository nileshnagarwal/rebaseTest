import { VehicleBodyService } from './../../common/services/masters/vehicle-body.service';
import { VehicleTypeService } from './../../common/services/masters/vehicle-type.service';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EnquiriesQuotesRoutingModule, routedComponents } from './enquiries-quotes-routing.module';
import { MaterialDesignModule } from '../../common/modules/material-design/material-design.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { EnquiriesService } from '../../common/services/enquiries-quotes/enquiries.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EnquiriesViewComponent } from './enquiries-view/enquiries-view.component';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    ThemeModule,
    EnquiriesQuotesRoutingModule,
    MaterialDesignModule,
    GooglePlaceModule,
    Ng2SmartTableModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyAdW-L7cDATNI2-G8kph-c8zKuDR8hTdzs',
    }),
    AgmDirectionModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    VehicleTypeService,
    VehicleBodyService,
    EnquiriesService,
  ],
  entryComponents: [
    EnquiriesViewComponent,
  ],
})
export class EnquiriesQuotesModule { }
