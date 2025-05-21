import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSettingOnAuthComponent } from './basic-setting-on-auth.component';

describe('BasicSettingOnAuthComponent', () => {
  let component: BasicSettingOnAuthComponent;
  let fixture: ComponentFixture<BasicSettingOnAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicSettingOnAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicSettingOnAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
