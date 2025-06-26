import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusMinusComponent } from './plus-minus.component';

describe('PlusMinusComponent', () => {
  let component: PlusMinusComponent;
  let fixture: ComponentFixture<PlusMinusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlusMinusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusMinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
