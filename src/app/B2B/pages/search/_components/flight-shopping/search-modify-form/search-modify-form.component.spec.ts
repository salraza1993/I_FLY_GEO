import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchModifyFormComponent } from './search-modify-form.component';

describe('SearchModifyFormComponent', () => {
  let component: SearchModifyFormComponent;
  let fixture: ComponentFixture<SearchModifyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchModifyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchModifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
