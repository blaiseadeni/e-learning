import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerGroupeComponent } from './creer-groupe.component';

describe('CreerGroupeComponent', () => {
  let component: CreerGroupeComponent;
  let fixture: ComponentFixture<CreerGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerGroupeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
