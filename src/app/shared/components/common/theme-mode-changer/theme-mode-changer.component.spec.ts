import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeModeChangerComponent } from './theme-mode-changer.component';

describe('ThemeModeChangerComponent', () => {
  let component: ThemeModeChangerComponent;
  let fixture: ComponentFixture<ThemeModeChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeModeChangerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeModeChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
