import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCalenderCarouselComponent } from './flight-calender-carousel.component';

describe('FlightCalenderCarouselComponent', () => {
  let component: FlightCalenderCarouselComponent;
  let fixture: ComponentFixture<FlightCalenderCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightCalenderCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightCalenderCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
