import {Component, OnInit} from '@angular/core';
import {input3} from "./input3";

@Component({
  selector: 'app-day3',
  standalone: true,
  imports: [],
  templateUrl: './day3.component.html',
  styleUrl: './day3.component.css'
})
export class Day3Component implements OnInit {
  text: string[][] = input3.split('\n')
    .map((line) => line.trim().split(""));
  result = -1;
  result2 = -1;

  private digitRegex = /\d/;

  ngOnInit(): void {
    const chars = this.text;
    this.calculatePart1(chars);
    this.calculatePart2(chars);
  }

  private calculatePart1(chars: string[][]) {
    const validNumber = [];
    for (let i = 0; i < chars.length; i++) {
      let numberStart = -1;
      let numberEnd = -1;

      for (let j = 0; j < chars[i].length; j++) {
        if (this.digitRegex.test(chars[i][j])) {
          if (numberStart < 0) {
            numberStart = j;
            numberEnd = j;
          } else {
            numberEnd = j;
          }
        }

        if (!this.digitRegex.test(chars[i][j]) || j === chars[i].length - 1) {
          if (numberStart >= 0) {
            if (this.checkNumber(i, numberStart, numberEnd)) {
              validNumber.push(Number(chars[i].slice(numberStart, numberEnd + 1).join("")))
            }
          }
          numberEnd = -1;
          numberStart = -1;
        }
      }

    }
    this.result = validNumber.reduce((p, c) => p + c, 0);
  }

  checkNumber(row: number, numberStart: number, numberEnd: number) {
    for (let i = row - 1; i <= row + 1; i++) {
      if (i < 0 || i >= this.text.length) {
        // console.log("continue", i);
        continue;
      }
      for (let j = numberStart - 1; j <= numberEnd + 1; j++) {
        if (j < 0 || j >= this.text[i].length) {
          // console.log("continue", i, j);
          continue;
        }
        const char = this.text[i][j];
        if (this.charIsSymbol(char)) {
          return true;
        }
      }
    }
    return false;
  }

  charIsSymbol(char: string) {
    return char !== "." && !this.digitRegex.test(char);
  }

  private calculatePart2(chars: string[][]) {
    const gears: Gear[] = [];
    this.findGears(chars, gears);

    for (let i = 0; i < chars.length; i++) {
      let numberStart = -1;
      let numberEnd = -1;

      for (let j = 0; j < chars[i].length; j++) {
        if (this.digitRegex.test(chars[i][j])) {
          if (numberStart < 0) {
            numberStart = j;
            numberEnd = j;
          } else {
            numberEnd = j;
          }
        }

        if (!this.digitRegex.test(chars[i][j]) || j === chars[i].length - 1) {
          if (numberStart >= 0) {
            this.attachNumberToGears(i, numberStart, numberEnd, gears, chars);
          }
          numberEnd = -1;
          numberStart = -1;
        }
      }

    }
    console.log(gears.filter(gear => gear.numbers.length));
    this.result2 = gears.filter(gear => gear.numbers.length == 2).reduce((p, c) => p + (c.numbers[0] * c.numbers[1]), 0);
  }

  private findGears(chars: string[][], gears: Gear[]) {
    for (let i = 0; i < chars.length; i++) {
      for (let j = 0; j < chars[i].length; j++) {
        if (chars[i][j] === "*") {
          gears.push(new Gear(i, j));
        }
      }
    }
  }

  private attachNumberToGears(row: number, numberStart: number, numberEnd: number, gears: Gear[], chars: string[][]) {
    const theNumber = Number(chars[row].slice(numberStart, numberEnd + 1).join(""))
    gears.filter(gear => gear.x <= row + 1 && gear.x >= row - 1 && numberStart - 1 <= gear.y && gear.y <= numberEnd + 1)
      .forEach(gear => gear.numbers.push(theNumber));
  }
}

class Gear {
  x: number;
  y: number;
  numbers: number[] = [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
