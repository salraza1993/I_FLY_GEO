import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareTypesComponent } from './fare-types.component';

describe('FareTypesComponent', () => {
  let component: FareTypesComponent;
  let fixture: ComponentFixture<FareTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FareTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FareTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
