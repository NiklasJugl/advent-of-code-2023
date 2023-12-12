import {Component, OnInit} from '@angular/core';
import {input9} from "../day9/input9";
import {input11} from "./input11";

class Star {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  calcDistances(stars1: Star[]) {
    return stars1.map(star => star.calcDistance(this)).reduce((p, c) => p + c);
  }

  private calcDistance(star: Star) {
    return Math.abs(this.x - star.x) + Math.abs(this.y - star.y);
  }

  calcDistancesWithExpansion(stars1: Star[], expansionsX: number[], expansionsY: number[]) {
    return stars1.filter(star => star !== this).map(star => star.calcDistanceWithExpansion(this, expansionsX, expansionsY)).reduce((p, c) => p + c, 0);
  }

  private calcDistanceWithExpansion(star: Star, expansionsX: number[], expansionsY: number[]) {
    const normalDistance = this.calcDistance(star);
    let distance = normalDistance;
    const xParams = [this.x, star.x].sort((a, b) => a - b);
    const yParams = [this.y, star.y].sort((a, b) => a - b);
    const countNumerExpansionX = expansionsX.filter(x => yParams[0] < x && x < yParams[1]).length;

    const countNumerExpansionY = expansionsY.filter(y => xParams[0] < y && y < xParams[1]).length;
    distance += (countNumerExpansionY * 999998) + (countNumerExpansionX * 999998);
    console.log("from", this.x, this.y, "to", star.x, star.y, distance, countNumerExpansionX, countNumerExpansionY);
    return distance;
  }
}

@Component({
  selector: 'app-day11',
  standalone: true,
  imports: [],
  templateUrl: './day11.component.html',
  styleUrl: './day11.component.css'
})
export class Day11Component implements OnInit {
  universe: string[][] = input11.split('\n')
    .map((line) => line.trim().replaceAll(/\s+/g, " ")).map(line => line.split(""));

  expansionsX: number[] = [];
  expansionsY: number[] = [];
  result = -1;
  result2 = -1;

  ngOnInit(): void {
    this.expandUniverse();
    console.log(this.universe);
    this.calculateResult1();
    this.calculateResult2();

  }

  private calculateResult1() {
    const stars: Star[] = [];
    for (let i = 0; i < this.universe.length; i++) {
      for (let j = 0; j < this.universe[0].length; j++) {
        if (this.universe[i][j] === "#") {
          stars.push(new Star(j, i));
        }
      }
    }

    this.result = stars.map((star, index) => star.calcDistances(stars.slice(index))).reduce((p, c) => p + c);

  }

  private expandUniverse() {
    for (let i = 0; i < this.universe.length; i++) {
      if (this.universe[i].every(element => element === ".")) {
        this.universe.splice(i, 0, Array(this.universe.length).fill("*"));
        this.expansionsY.push(i);
        i++;
      }
    }
    for (let j = 0; j < this.universe[0].length; j++) {
      let allSpace = true;
      for (let i = 0; i < this.universe.length; i++) {
        allSpace = allSpace && (this.universe[i][j] === "." || this.universe[i][j] === "*");
      }
      if (allSpace) {
        for (let i = 0; i < this.universe.length; i++) {
          this.universe[i].splice(j, 0, "*");
        }
        this.expansionsX.push(j);
        j++;
      }
    }
  }

  private calculateResult2() {
    const stars: Star[] = [];
    for (let i = 0; i < this.universe.length; i++) {
      for (let j = 0; j < this.universe[0].length; j++) {
        if (this.universe[i][j] === "#") {
          stars.push(new Star(i, j));
        }
      }
    }
    console.log(this.expansionsX, this.expansionsY);
    this.result2 = stars.map((star, index) => star.calcDistancesWithExpansion(stars.slice(index), this.expansionsX, this.expansionsY)).reduce((p, c) => p + c);
  }
}
