import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakerLineComponent } from './breaker-line.component';

describe('BreakerLineComponent', () => {
  let component: BreakerLineComponent;
  let fixture: ComponentFixture<BreakerLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakerLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreakerLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
