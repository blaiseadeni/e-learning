import { TestBed } from '@angular/core/testing';

import { VacanceService } from './vacance.service';

describe('VacanceService', () => {
  let service: VacanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
