import { TestBed } from '@angular/core/testing';

import { TpService } from './tp.service';

describe('TpService', () => {
  let service: TpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
