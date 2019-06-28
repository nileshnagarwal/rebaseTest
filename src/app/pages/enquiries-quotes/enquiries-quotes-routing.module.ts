import { QuotesReportComponent } from './quotes-report/quotes-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { EnquiriesComponent } from './../enquiries-quotes/enquiries/enquiries.component';
import { EnquiriesReportComponent } from './enquiries-report/enquiries-report.component';
import { EnquiriesViewComponent } from './enquiries-view/enquiries-view.component';
import { EnquiriesQuotesComponent } from './enquiries-quotes.component';

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
  component: QuotesReportComponent,
  children: [{
    path: 'quotes-report',
    component: QuotesReportComponent,
  }],
  }];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiriesQuotesRoutingModule { }

export const routedComponents = [
  EnquiriesQuotesComponent,
  EnquiriesComponent,
  QuotesComponent,
  EnquiriesReportComponent,
  EnquiriesViewComponent,
  QuotesReportComponent,
];
