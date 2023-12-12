import {Component, OnInit} from '@angular/core';
import {input9} from "../day9/input9";
import {input13} from "./input13";

@Component({
  selector: 'app-day13',
  standalone: true,
  imports: [],
  templateUrl: './day13.component.html',
  styleUrl: './day13.component.css'
})
export class Day13Component implements OnInit {
  text: number[][] = input13.split('\n')
    .map((line) => line.trim().replaceAll(/\s+/g, " "))
    .map(line => line.split(" ").map(value => Number(value)));
  result = -1;
  result2 = -1;

  ngOnInit(): void {

    // this.calculateResult1();
    // this.calculateResult2();

  }

}
