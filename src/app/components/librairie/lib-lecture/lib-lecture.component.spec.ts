import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibLectureComponent } from './lib-lecture.component';

describe('LibLectureComponent', () => {
  let component: LibLectureComponent;
  let fixture: ComponentFixture<LibLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibLectureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
