import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLayoverComponent } from './details-layover.component';

describe('DetailsLayoverComponent', () => {
  let component: DetailsLayoverComponent;
  let fixture: ComponentFixture<DetailsLayoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsLayoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsLayoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
