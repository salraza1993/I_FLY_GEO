import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPerformedUsersComponent } from './top-performed-users.component';

describe('TopPerformedUsersComponent', () => {
  let component: TopPerformedUsersComponent;
  let fixture: ComponentFixture<TopPerformedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPerformedUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPerformedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
