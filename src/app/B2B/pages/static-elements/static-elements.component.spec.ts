import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticElementsComponent } from './static-elements.component';

describe('StaticElementsComponent', () => {
  let component: StaticElementsComponent;
  let fixture: ComponentFixture<StaticElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticElementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
