import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCarsComponent } from './search-cars.component';

describe('SearchCarsComponent', () => {
  let component: SearchCarsComponent;
  let fixture: ComponentFixture<SearchCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
