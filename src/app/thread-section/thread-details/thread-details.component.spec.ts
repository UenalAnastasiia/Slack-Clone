import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadDetailsComponent } from './thread-details.component';

describe('ThreadDetailsComponent', () => {
  let component: ThreadDetailsComponent;
  let fixture: ComponentFixture<ThreadDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
