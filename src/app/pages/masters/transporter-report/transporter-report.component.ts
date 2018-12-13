import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransporterViewComponent } from './../transporter-view/transporter-view.component';
import { TransporterComponent } from './../transporter/transporter.component';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-transporter-report',
  templateUrl: './transporter-report.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class TransporterReportComponent { }
