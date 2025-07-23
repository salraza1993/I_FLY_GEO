import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSegmentComponent } from './loader-segment.component';

describe('LoaderSegmentComponent', () => {
  let component: LoaderSegmentComponent;
  let fixture: ComponentFixture<LoaderSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderSegmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
