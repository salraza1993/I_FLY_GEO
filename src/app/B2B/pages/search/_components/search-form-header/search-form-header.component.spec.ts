import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormHeaderComponent } from './search-form-header.component';

describe('SearchFormHeaderComponent', () => {
  let component: SearchFormHeaderComponent;
  let fixture: ComponentFixture<SearchFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
