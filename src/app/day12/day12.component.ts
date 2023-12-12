import {Component, OnInit} from '@angular/core';
import {input9} from "../day9/input9";
import {input12} from "./input12";

@Component({
  selector: 'app-day12',
  standalone: true,
  imports: [],
  templateUrl: './day12.component.html',
  styleUrl: './day12.component.css'
})
export class Day12Component implements OnInit {
  text: number[][] = input12.split('\n')
    .map((line) => line.trim().replaceAll(/\s+/g, " "))
    .map(line => line.split(" ").map(value => Number(value)));
  result = -1;
  result2 = -1;

  ngOnInit(): void {

    // this.calculateResult1();
    // this.calculateResult2();

  }

}
