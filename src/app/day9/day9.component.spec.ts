import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day9Component } from './day9.component';

describe('Day9Component', () => {
  let component: Day9Component;
  let fixture: ComponentFixture<Day9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
