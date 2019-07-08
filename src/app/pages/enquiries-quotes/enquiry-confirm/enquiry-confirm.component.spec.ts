import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryConfirmComponent } from './enquiry-confirm.component';

describe('EnquiryConfirmComponent', () => {
  let component: EnquiryConfirmComponent;
  let fixture: ComponentFixture<EnquiryConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryConfirmComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
