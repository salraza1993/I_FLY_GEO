import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtonLinkComponent } from './custom-button-link.component';

describe('CustomButtonLinkComponent', () => {
  let component: CustomButtonLinkComponent;
  let fixture: ComponentFixture<CustomButtonLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButtonLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomButtonLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
