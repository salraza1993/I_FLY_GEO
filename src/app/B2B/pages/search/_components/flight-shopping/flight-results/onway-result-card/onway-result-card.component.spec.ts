import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnwayResultCardComponent } from './onway-result-card.component';

describe('OnwayResultCardComponent', () => {
  let component: OnwayResultCardComponent;
  let fixture: ComponentFixture<OnwayResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnwayResultCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnwayResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
