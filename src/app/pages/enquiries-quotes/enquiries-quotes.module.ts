import { VehicleTypeService } from './../../common/services/masters/vehicle-type.service';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EnquiriesQuotesRoutingModule, routedComponents } from './enquiries-quotes-routing.module';
import { MaterialDesignModule } from '../../common/modules/material-design/material-design.module';


@NgModule({
  imports: [
    ThemeModule,
    EnquiriesQuotesRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCa_g_ssoDwW4RM0k6GpCk8oGIzjWoyDjY",
      libraries: ["places"]
    }),
    MaterialDesignModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    VehicleTypeService,
  ],  
})
export class EnquiriesQuotesModule { }
