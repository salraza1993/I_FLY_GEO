import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStripWrapperComponent } from './filter-strip-wrapper.component';

describe('FilterStripWrapperComponent', () => {
  let component: FilterStripWrapperComponent;
  let fixture: ComponentFixture<FilterStripWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterStripWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterStripWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
