import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundtripResultCardComponent } from './roundtrip-result-card.component';

describe('RoundtripResultCardComponent', () => {
  let component: RoundtripResultCardComponent;
  let fixture: ComponentFixture<RoundtripResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundtripResultCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundtripResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
