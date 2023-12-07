import {Component, OnInit} from '@angular/core';
import {input7} from "../day7/input7";
import {input8} from "./input8";

@Component({
  selector: 'app-day8',
  standalone: true,
  imports: [],
  templateUrl: './day8.component.html',
  styleUrl: './day8.component.css'
})
export class Day8Component implements OnInit {
  text: string[] = input8.split('\n')
    .map((line) => line.trim().replaceAll(/\s+/g, " "));
  result = -1;
  result2 = -1;

  ngOnInit(): void {
    // this.calculateResult1();
    // this.calculateResult2();

  }
}
