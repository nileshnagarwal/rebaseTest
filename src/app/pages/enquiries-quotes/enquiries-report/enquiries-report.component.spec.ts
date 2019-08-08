import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiriesReportComponent } from './enquiries-report.component';

describe('EnquiriesReportComponent', () => {
  let component: EnquiriesReportComponent;
  let fixture: ComponentFixture<EnquiriesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiriesReportComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiriesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
