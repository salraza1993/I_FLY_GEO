import { TestBed } from '@angular/core/testing';

import { FlightSearchRequestService } from './flight-search-request.service';

describe('FlightSearchRequestService', () => {
  let service: FlightSearchRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightSearchRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
