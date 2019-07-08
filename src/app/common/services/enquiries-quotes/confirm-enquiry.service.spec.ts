import { TestBed } from '@angular/core/testing';

import { ConfirmEnquiryService } from './confirm-enquiry.service';

describe('ConfirmEnquiryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmEnquiryService = TestBed.get(ConfirmEnquiryService);
    expect(service).toBeTruthy();
  });
});
