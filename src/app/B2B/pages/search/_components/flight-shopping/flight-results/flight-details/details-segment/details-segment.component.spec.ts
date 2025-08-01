import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSegmentComponent } from './details-segment.component';

describe('DetailsSegmentComponent', () => {
  let component: DetailsSegmentComponent;
  let fixture: ComponentFixture<DetailsSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSegmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
