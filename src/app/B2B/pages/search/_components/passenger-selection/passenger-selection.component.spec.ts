import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerSelectionComponent } from './passenger-selection.component';

describe('PassengerSelectionComponent', () => {
  let component: PassengerSelectionComponent;
  let fixture: ComponentFixture<PassengerSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
