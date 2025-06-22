import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxRadioGroupedComponent } from './checkbox-radio-grouped.component';

describe('CheckboxRadioGroupedComponent', () => {
  let component: CheckboxRadioGroupedComponent;
  let fixture: ComponentFixture<CheckboxRadioGroupedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxRadioGroupedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxRadioGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
