import { TestBed } from '@angular/core/testing';

import { InterroService } from './interro.service';

describe('InterroService', () => {
  let service: InterroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
