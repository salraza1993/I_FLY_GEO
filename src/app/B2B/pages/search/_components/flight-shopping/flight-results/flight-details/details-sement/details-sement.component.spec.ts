import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSementComponent } from './details-sement.component';

describe('DetailsSementComponent', () => {
  let component: DetailsSementComponent;
  let fixture: ComponentFixture<DetailsSementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
