import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPriceComponent } from './details-price.component';

describe('DetailsPriceComponent', () => {
  let component: DetailsPriceComponent;
  let fixture: ComponentFixture<DetailsPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
