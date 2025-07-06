import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnwardRoundtripComponent } from './onward-roundtrip.component';

describe('OnwardRoundtripComponent', () => {
  let component: OnwardRoundtripComponent;
  let fixture: ComponentFixture<OnwardRoundtripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnwardRoundtripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnwardRoundtripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
