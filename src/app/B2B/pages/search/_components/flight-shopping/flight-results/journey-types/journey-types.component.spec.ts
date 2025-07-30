import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyTypesComponent } from './journey-types.component';

describe('JourneyTypesComponent', () => {
  let component: JourneyTypesComponent;
  let fixture: ComponentFixture<JourneyTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneyTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
