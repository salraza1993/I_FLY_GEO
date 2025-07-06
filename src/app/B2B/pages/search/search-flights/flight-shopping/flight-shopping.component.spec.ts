import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightShoppingComponent } from './flight-shopping.component';

describe('FlightShoppingComponent', () => {
  let component: FlightShoppingComponent;
  let fixture: ComponentFixture<FlightShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightShoppingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
