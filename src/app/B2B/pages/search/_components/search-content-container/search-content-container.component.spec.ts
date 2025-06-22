import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContentContainerComponent } from './search-content-container.component';

describe('SearchContentContainerComponent', () => {
  let component: SearchContentContainerComponent;
  let fixture: ComponentFixture<SearchContentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContentContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
