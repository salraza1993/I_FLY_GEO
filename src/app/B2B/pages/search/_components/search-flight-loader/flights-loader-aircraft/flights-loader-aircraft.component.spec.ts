import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsLoaderAircraftComponent } from './flights-loader-aircraft.component';

describe('FlightsLoaderAircraftComponent', () => {
  let component: FlightsLoaderAircraftComponent;
  let fixture: ComponentFixture<FlightsLoaderAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsLoaderAircraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsLoaderAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
