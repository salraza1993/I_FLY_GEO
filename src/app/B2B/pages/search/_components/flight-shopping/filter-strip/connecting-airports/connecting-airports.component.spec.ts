import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectingAirportsComponent } from './connecting-airports.component';

describe('ConnectingAirportsComponent', () => {
  let component: ConnectingAirportsComponent;
  let fixture: ComponentFixture<ConnectingAirportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectingAirportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectingAirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
