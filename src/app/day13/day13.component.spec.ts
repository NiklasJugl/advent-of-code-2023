import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day13Component } from './day13.component';

describe('Day13Component', () => {
  let component: Day13Component;
  let fixture: ComponentFixture<Day13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
