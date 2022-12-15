import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelContainerComponent } from './channel-container.component';

describe('ChannelContainerComponent', () => {
  let component: ChannelContainerComponent;
  let fixture: ComponentFixture<ChannelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
