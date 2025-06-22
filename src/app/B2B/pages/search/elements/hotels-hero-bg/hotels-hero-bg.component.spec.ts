import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsHeroBgComponent } from './hotels-hero-bg.component';

describe('HotelsHeroBgComponent', () => {
  let component: HotelsHeroBgComponent;
  let fixture: ComponentFixture<HotelsHeroBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsHeroBgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelsHeroBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
