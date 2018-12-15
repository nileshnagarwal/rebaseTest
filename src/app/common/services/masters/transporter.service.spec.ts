import { TestBed, inject } from '@angular/core/testing';

import { TransporterService } from './transporter.service';

describe('TransporterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransporterService],
    });
  });

  it('should be created', inject([TransporterService], (service: TransporterService) => {
    expect(service).toBeTruthy();
  }));
});
