import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThreadCommentComponent } from './add-thread-comment.component';

describe('AddThreadCommentComponent', () => {
  let component: AddThreadCommentComponent;
  let fixture: ComponentFixture<AddThreadCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThreadCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddThreadCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
