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
  private pattern: string[] = [];
  private map: { [key: string]: Node } = {};

  ngOnInit(): void {
    this.pattern = this.text[0].trim().split("");
    const mapInstructions = this.text.slice(2).sort();
    for (let i = 0; i < mapInstructions.length; i++) {
      const inputs = mapInstructions[i].split(" = ");
      this.map[inputs[0]] = new Node(inputs[1]);
    }

    // this.calculateResult1();
    this.calculateResult2();

  }

  private calculateResult1() {
    let steps = 0;
    let position = "AAA";
    while (position !== "ZZZ") {
      if (this.pattern[steps % this.pattern.length] === "L") {
        position = this.map[position].left;
      } else {
        position = this.map[position].right;
      }
      steps++;
    }
    this.result = steps;
  }

  private calculateResult2() {
    const mapInstructions = this.text.slice(2).sort();
    let positions = mapInstructions.map(s => s.substring(0, 3)).filter(s => s.substring(2, 3) === "A");

    let steps = 0;
    while (!this.atFinalPosition(positions)) {
      this.logAtPartial(positions, steps);
      for (let i = 0; i < positions.length; i++) {
        if (this.pattern[steps % this.pattern.length] === "L") {
          positions[i] = this.map[positions[i]].left;
        } else {
          positions[i] = this.map[positions[i]].right;
        }
      }
      steps++;
      if(steps > 100000)
        break;
    }

    this.result2 = steps;
  }

  private atFinalPosition(positions: string[]) {
    return positions.every(p => p.substring(2, 3) === "Z");
  }

  private logAtPartial(positions: string[], count: number) {
    if( positions.some(p => p.substring(2, 3) === "Z")){
      console.log(positions, count);
    }
  }
}


class Node {
  left: string;
  right: string

  constructor(input: string) {
    const inputSplit = input.substring(1, 9).split(", ");
    this.left = inputSplit[0];
    this.right = inputSplit[1];
  }
}
