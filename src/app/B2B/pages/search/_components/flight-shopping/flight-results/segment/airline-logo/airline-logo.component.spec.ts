import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineLogoComponent } from './airline-logo.component';

describe('AirlineLogoComponent', () => {
  let component: AirlineLogoComponent;
  let fixture: ComponentFixture<AirlineLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirlineLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirlineLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
