import { TestBed } from '@angular/core/testing';

import { FlightResultsManagerService } from './flight-results-manager.service';

describe('FlightResultsManagerService', () => {
  let service: FlightResultsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightResultsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
