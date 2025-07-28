import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsJourneysComponent } from './flight-details-journeys.component';

describe('FlightDetailsJourneysComponent', () => {
  let component: FlightDetailsJourneysComponent;
  let fixture: ComponentFixture<FlightDetailsJourneysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDetailsJourneysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDetailsJourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
