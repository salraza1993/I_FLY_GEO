import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStripComponent } from './filter-strip.component';

describe('FilterStripComponent', () => {
  let component: FilterStripComponent;
  let fixture: ComponentFixture<FilterStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterStripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
