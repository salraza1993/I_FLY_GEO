import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsHeroBgComponent } from './flights-hero-bg.component';

describe('FlightsHeroBgComponent', () => {
  let component: FlightsHeroBgComponent;
  let fixture: ComponentFixture<FlightsHeroBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsHeroBgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsHeroBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
