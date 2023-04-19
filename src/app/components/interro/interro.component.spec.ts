import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterroComponent } from './interro.component';

describe('InterroComponent', () => {
  let component: InterroComponent;
  let fixture: ComponentFixture<InterroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
