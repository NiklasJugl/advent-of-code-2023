import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day12Component } from './day12.component';

describe('Day12Component', () => {
  let component: Day12Component;
  let fixture: ComponentFixture<Day12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
