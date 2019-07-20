import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiriesSearchComponent } from './enquiries-search.component';

describe('EnquiriesSearchComponent', () => {
  let component: EnquiriesSearchComponent;
  let fixture: ComponentFixture<EnquiriesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiriesSearchComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiriesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
