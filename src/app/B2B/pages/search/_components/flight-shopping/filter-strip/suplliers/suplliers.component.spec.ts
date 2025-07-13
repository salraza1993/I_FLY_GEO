import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplliersComponent } from './suplliers.component';

describe('SuplliersComponent', () => {
  let component: SuplliersComponent;
  let fixture: ComponentFixture<SuplliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuplliersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuplliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
