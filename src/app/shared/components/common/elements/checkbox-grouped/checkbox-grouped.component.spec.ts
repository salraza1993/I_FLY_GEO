import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxGroupedComponent } from './checkbox-grouped.component';

describe('CheckboxGroupedComponent', () => {
  let component: CheckboxGroupedComponent;
  let fixture: ComponentFixture<CheckboxGroupedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
