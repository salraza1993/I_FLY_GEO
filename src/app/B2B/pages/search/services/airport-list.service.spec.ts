import { TestBed } from '@angular/core/testing';

import { AirportListService } from './airport-list.service';

describe('AirportListService', () => {
  let service: AirportListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
