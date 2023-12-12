import {Component, OnInit} from '@angular/core';
import {input9} from "../day9/input9";
import {input10} from "./input10";


@Component({
  selector: 'app-day10',
  standalone: true,
  imports: [],
  templateUrl: './day10.component.html',
  styleUrl: './day10.component.css'
})
export class Day10Component implements OnInit {
  text: string[][] = input10.split('\n')
    .map((line) => line.trim().replaceAll(/\s+/g, " ")).map(line => line.split(""));

  result = -1;
  result2 = -1;

  ngOnInit(): void {

    this.calculateResult1();
    // this.calculateResult2();

  }

  private calculateResult1() {
    let startX = -1;
    let startY = -1;

    const map: Map[][] = [];
    for (let i = 0; i < this.text.length; i++) {
      map.push([]);
      for (let j = 0; j < this.text[i].length; j++) {
        if (this.text[i][j] === "S") {
          startX = i;
          startY = j;
        }
        map[i].push(new Map(this.text[i][j], i, j));
      }
    }

    for (let i = 0; i < this.text.length; i++) {
      for (let j = 0; j < this.text[i].length; j++) {
        map[i][j].initialize(map);
      }
    }

    this.result = Math.ceil(map[startX][startY].calcSegmentlength() / 2);

  }
}

class Map {
  feld: string;
  x: number;
  y: number;
  nextElement!: Map;
  previousElement!: Map;

  constructor(input: string, x: number, y: number) {
    this.feld = input;
    this.x = x;
    this.y = y;
  }

  // | is a vertical pipe connecting north and south.
  //   - is a horizontal pipe connecting east and west.
  //     L is a 90-degree bend connecting north and east.
  //     J is a 90-degree bend connecting north and west.
  //   7 is a 90-degree bend connecting south and west.
  //     F is a 90-degree bend connecting south and east.
  //     . is ground; there is no pipe in this tile.
  //     S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.


  initialize(map: Map[][]) {
    switch (this.feld) {
      case "|":
        this.previousElement = map[this.x - 1] && map[this.x - 1][this.y];
        this.nextElement = map[this.x + 1] && map[this.x + 1][this.y];
        break;
      case "-":
        this.previousElement = map[this.x][this.y - 1];
        this.nextElement = map[this.x][this.y + 1];
        break;
      case "L":
        this.previousElement = map[this.x - 1] && map[this.x - 1][this.y];
        this.nextElement = map[this.x][this.y + 1];
        break;
      case "J":
        this.previousElement = map[this.x - 1] && map[this.x - 1][this.y];
        this.nextElement = map[this.x][this.y - 1];
        break;
      case "7":
        this.previousElement = map[this.x][this.y - 1];
        this.nextElement = map[this.x + 1] && map[this.x + 1][this.y];
        break;
      case "F":
        this.previousElement = map[this.x][this.y + 1];
        this.nextElement = map[this.x + 1] && map[this.x + 1][this.y];
        break;
      case ".":
        break;
      case "S":
        break;
    }
    if (this.nextElement && this.nextElement.feld === "S") {
      this.nextElement.previousElement = this;
    }
    if (this.previousElement && this.previousElement.feld === "S") {
      this.previousElement.nextElement = this;
    }
  }

  calcSegmentlength(previousElement?: Map): number {
    console.log(this);
    if (!previousElement && this.feld === "S") {
      return this.nextElement.calcSegmentlength(this) + 1;
    } else if (previousElement && this.feld !== "S") {
      if(this.previousElement === previousElement){
        return this.nextElement.calcSegmentlength(this) + 1;
      }else{
        return this.previousElement.calcSegmentlength(this) + 1;
      }
    } else {
      // End reached
      return 0;
    }
  }
}
