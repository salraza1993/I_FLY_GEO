import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchServicesTabsComponent } from './search-services-tabs.component';

describe('SearchServicesTabsComponent', () => {
  let component: SearchServicesTabsComponent;
  let fixture: ComponentFixture<SearchServicesTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchServicesTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchServicesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
