import { VehicleBodyComponent } from './vehicle-body/vehicle-body.component';
import { VehicleTypeService } from './../../common/services/masters/vehicle-type.service';
import { TransporterComponent } from './transporter/transporter.component';
import { TransporterViewComponent } from './transporter-view/transporter-view.component';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { MastersRoutingModule, routedComponents } from './masters-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { VehicleBodyService } from './../../common/services/masters/vehicle-body.service';

@NgModule({
  imports: [
    ThemeModule,
    MastersRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    VehicleBodyComponent,
  ],
  providers: [
    VehicleBodyService,
    VehicleTypeService,
    TransporterComponent,
  ],
  entryComponents: [
    TransporterViewComponent,
  ],
})

export class MastersModule { }
