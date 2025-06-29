import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViewAdsComponent } from './search-view-ads.component';

describe('SearchViewAdsComponent', () => {
  let component: SearchViewAdsComponent;
  let fixture: ComponentFixture<SearchViewAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchViewAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchViewAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
