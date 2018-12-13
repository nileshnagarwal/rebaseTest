import { TestBed, inject } from '@angular/core/testing';

import { VehicleBodyService } from './vehicle-body.service';

describe('VehicleBodyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleBodyService],
    });
  });

  it('should be created', inject([VehicleBodyService], (service: VehicleBodyService) => {
    expect(service).toBeTruthy();
  }));
});
