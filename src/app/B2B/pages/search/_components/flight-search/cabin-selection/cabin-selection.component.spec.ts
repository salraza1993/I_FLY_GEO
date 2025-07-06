import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinSelectionComponent } from './cabin-selection.component';

describe('CabinSelectionComponent', () => {
  let component: CabinSelectionComponent;
  let fixture: ComponentFixture<CabinSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabinSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
