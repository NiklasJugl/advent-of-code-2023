import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day10Component } from './day10.component';

describe('Day10Component', () => {
  let component: Day10Component;
  let fixture: ComponentFixture<Day10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
