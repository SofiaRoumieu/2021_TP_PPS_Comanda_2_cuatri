import { TestBed } from '@angular/core/testing';

import { ScanerService } from './scaner.service';

describe('ScanerService', () => {
  let service: ScanerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
