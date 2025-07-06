import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsLoaderIllustrationComponent } from './flights-loader-illustration.component';

describe('FlightsLoaderIllustrationComponent', () => {
  let component: FlightsLoaderIllustrationComponent;
  let fixture: ComponentFixture<FlightsLoaderIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsLoaderIllustrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsLoaderIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
