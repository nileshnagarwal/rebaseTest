import { TestBed } from '@angular/core/testing';

import { ExtraExpensesService } from './extra-expenses.service';

describe('ExtraExpensesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtraExpensesService = TestBed.get(ExtraExpensesService);
    expect(service).toBeTruthy();
  });
});
