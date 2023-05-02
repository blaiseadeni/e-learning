import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLiveComponent } from './welcome-live.component';

describe('WelcomeLiveComponent', () => {
  let component: WelcomeLiveComponent;
  let fixture: ComponentFixture<WelcomeLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeLiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
