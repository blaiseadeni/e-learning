import { TestBed } from '@angular/core/testing';

import { LibrairieService } from './librairie.service';

describe('LibrairieService', () => {
  let service: LibrairieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrairieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
