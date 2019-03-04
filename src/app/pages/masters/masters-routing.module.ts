import { AuthGuardService } from '../../common/services/auth/auth-guard/auth-guard.service';
import { VehicleTypeReportComponent } from './vehicle-type-report/vehicle-type-report.component';
import { VehicleBodyReportComponent } from './vehicle-body-report/vehicle-body-report.component';
import { TransporterViewComponent } from './transporter-view/transporter-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MastersComponent } from './masters.component';
import { VehicleBodyComponent } from './vehicle-body/vehicle-body.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { TransporterReportComponent } from './transporter-report/transporter-report.component';
import { TransporterComponent } from './transporter/transporter.component';

const routes: Routes = [{
  path: '',
  component: VehicleBodyComponent,
  children: [{
    path: 'vehicle-body',
    canActivate: [AuthGuardService],
    component: VehicleBodyComponent,
    }],
  }, {
  path: '',
  component: VehicleTypeComponent,
  children: [{
    path: 'vehicle-type',
    canActivate: [AuthGuardService],
    component: VehicleTypeComponent,
  }],
  }, {
    path: '',
    component: TransporterComponent,
    children: [{
      path: 'transporter',
      canActivate: [AuthGuardService],
      component: TransporterComponent,
    }],
    }];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MastersRoutingModule { }

export const routedComponents = [
  MastersComponent,
  VehicleBodyComponent,
  VehicleTypeComponent,
  TransporterComponent,
  TransporterReportComponent,
  TransporterViewComponent,
  VehicleBodyReportComponent,
  VehicleTypeReportComponent,
];
