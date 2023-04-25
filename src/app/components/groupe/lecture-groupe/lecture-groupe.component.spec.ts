import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureGroupeComponent } from './lecture-groupe.component';

describe('LectureGroupeComponent', () => {
  let component: LectureGroupeComponent;
  let fixture: ComponentFixture<LectureGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureGroupeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
