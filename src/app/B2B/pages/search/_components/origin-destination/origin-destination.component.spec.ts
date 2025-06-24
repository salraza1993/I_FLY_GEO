import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginDestinationComponent } from './origin-destination.component';

describe('OriginDestinationComponent', () => {
  let component: OriginDestinationComponent;
  let fixture: ComponentFixture<OriginDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
