import { TestBed } from '@angular/core/testing';

import { FlightResultModifierService } from './flight-result-modifier.service';

describe('FlightResultModifierService', () => {
  let service: FlightResultModifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightResultModifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
