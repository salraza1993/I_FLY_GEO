import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDatepickerComponent } from './search-datepicker.component';

describe('SearchDatepickerComponent', () => {
  let component: SearchDatepickerComponent;
  let fixture: ComponentFixture<SearchDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
