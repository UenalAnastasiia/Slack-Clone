import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChatMessageComponent } from './add-chat-message.component';

describe('AddChatMessageComponent', () => {
  let component: AddChatMessageComponent;
  let fixture: ComponentFixture<AddChatMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChatMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
