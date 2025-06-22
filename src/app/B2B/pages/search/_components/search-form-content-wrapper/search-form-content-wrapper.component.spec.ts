import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormContentWrapperComponent } from './search-form-content-wrapper.component';

describe('SearchFormContentWrapperComponent', () => {
  let component: SearchFormContentWrapperComponent;
  let fixture: ComponentFixture<SearchFormContentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormContentWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFormContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
