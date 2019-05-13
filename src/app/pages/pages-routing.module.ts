import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuardService } from '../common/services/auth/auth-guard/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuardService],
  children: [
  //   {
  //   path: 'dashboard',
  //   canActivate: [AuthGuardService],
  //   component: ECommerceComponent,
  // }, {
  //   path: 'iot-dashboard',
  //   component: DashboardComponent,
  // },
  {
    path: 'masters',
    loadChildren: './masters/masters.module#MastersModule',
  }, {
    path: 'enquiries-quotes',
    loadChildren: './enquiries-quotes/enquiries-quotes.module#EnquiriesQuotesModule',
  },
  // {
  //   path: 'ui-features',
  //   loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  // }, {
  //   path: 'modal-overlays',
  //   loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  // }, {
  //   path: 'extra-components',
  //   loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  // }, {
  //   path: 'bootstrap',
  //   loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  // }, {
  //   path: 'maps',
  //   loadChildren: './maps/maps.module#MapsModule',
  // }, {
  //   path: 'charts',
  //   loadChildren: './charts/charts.module#ChartsModule',
  // }, {
  //   path: 'editors',
  //   loadChildren: './editors/editors.module#EditorsModule',
  // }, {
  //   path: 'forms',
  //   loadChildren: './forms/forms.module#FormsModule',
  // }, {
  //   path: 'tables',
  //   loadChildren: './tables/tables.module#TablesModule',
  // }, {
  //   path: 'miscellaneous',
  //   loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  // },
  {
    path: '',
    redirectTo: 'enquiries-quotes/enquiries',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
