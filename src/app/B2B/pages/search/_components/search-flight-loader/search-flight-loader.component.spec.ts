import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFlightLoaderComponent } from './search-flight-loader.component';

describe('SearchFlightLoaderComponent', () => {
  let component: SearchFlightLoaderComponent;
  let fixture: ComponentFixture<SearchFlightLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFlightLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFlightLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
