import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { EnquiriesComponent } from './../enquiries-quotes/enquiries/enquiries.component';
import { EnquiriesReportComponent } from './enquiries-report/enquiries-report.component';
import { EnquiriesViewComponent } from './enquiries-view/enquiries-view.component';

const routes: Routes = [{
  path: '',
  component: EnquiriesComponent,
  children: [{
    path: 'enquiries',
    component: EnquiriesComponent,
    }],
  },
  {
  path: '',
  component: EnquiriesReportComponent,
  children: [{
    path: 'enquiries-report',
    component: EnquiriesReportComponent,
  }],
  },
  {
  path: '',
  component: QuotesComponent,
  children: [{
    path: 'quotes',
    component: QuotesComponent,
  }],
  }];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiriesQuotesRoutingModule { }

export const routedComponents = [
  EnquiriesComponent,
  QuotesComponent,
  EnquiriesReportComponent,
  EnquiriesViewComponent,
];
