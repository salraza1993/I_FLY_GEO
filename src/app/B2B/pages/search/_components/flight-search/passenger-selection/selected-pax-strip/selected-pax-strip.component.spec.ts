import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPaxStripComponent } from './selected-pax-strip.component';

describe('SelectedPaxStripComponent', () => {
  let component: SelectedPaxStripComponent;
  let fixture: ComponentFixture<SelectedPaxStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedPaxStripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedPaxStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
