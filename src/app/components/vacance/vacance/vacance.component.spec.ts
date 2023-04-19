import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanceComponent } from './vacance.component';

describe('VacanceComponent', () => {
  let component: VacanceComponent;
  let fixture: ComponentFixture<VacanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
