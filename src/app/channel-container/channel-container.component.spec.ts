import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanelContainerComponent } from './channel-container.component';

describe('ChanelContainerComponent', () => {
  let component: ChanelContainerComponent;
  let fixture: ComponentFixture<ChanelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChanelContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
