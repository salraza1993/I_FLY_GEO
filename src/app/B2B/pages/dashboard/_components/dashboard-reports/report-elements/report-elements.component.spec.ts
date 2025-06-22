import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportElementsComponent } from './report-elements.component';

describe('ReportElementsComponent', () => {
  let component: ReportElementsComponent;
  let fixture: ComponentFixture<ReportElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportElementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
