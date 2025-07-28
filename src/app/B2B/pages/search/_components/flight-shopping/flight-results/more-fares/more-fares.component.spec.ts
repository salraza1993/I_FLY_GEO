import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreFaresComponent } from './more-fares.component';

describe('MoreFaresComponent', () => {
  let component: MoreFaresComponent;
  let fixture: ComponentFixture<MoreFaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreFaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreFaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
