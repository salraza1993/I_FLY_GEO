import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchModifyComponent } from './search-modify.component';

describe('SearchModifyComponent', () => {
  let component: SearchModifyComponent;
  let fixture: ComponentFixture<SearchModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
