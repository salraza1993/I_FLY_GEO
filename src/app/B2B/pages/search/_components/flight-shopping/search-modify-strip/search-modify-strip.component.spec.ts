import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchModifyStripComponent } from './search-modify-strip.component';

describe('SearchModifyStripComponent', () => {
  let component: SearchModifyStripComponent;
  let fixture: ComponentFixture<SearchModifyStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchModifyStripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchModifyStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
