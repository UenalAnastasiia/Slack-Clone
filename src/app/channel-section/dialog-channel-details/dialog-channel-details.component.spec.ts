import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChannelDetailsComponent } from './dialog-channel-details.component';

describe('DialogChannelDetailsComponent', () => {
  let component: DialogChannelDetailsComponent;
  let fixture: ComponentFixture<DialogChannelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChannelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogChannelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
