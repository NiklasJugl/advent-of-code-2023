import {Component, OnInit} from '@angular/core';
import {input5} from "./input5";

@Component({
  selector: 'app-day5',
  standalone: true,
  imports: [],
  templateUrl: './day5.component.html',
  styleUrl: './day5.component.css'
})
export class Day5Component implements OnInit {
  text: string[] = input5.split('\n')
    .map((line) => line.trim());
  result = -1;
  result2 = -1;

  seeds: string[] = []
  maps: Map[] = [];

  ngOnInit(): void {
    for (let i = 0; i < this.text.length; i++) {
      const line = this.text[i];
      if (line.includes("seeds:")) {
        this.seeds.push(...line.split(":")[1].trim().split(" "));
        i++;
      } else if (line.includes("map:")) {
        const map = new Map(line, this.text, i);
        i = i + map.maps.length + 1;
        this.maps.push(map);
      }
    }

    this.calculateResult1();
  }

  private calculateResult1() {
    const numbers = this.seeds.map((seed) => this.getLocationForSeed(Number(seed)));
    this.result = Math.min(...numbers);
  }

  private getLocationForSeed(seed: number) {
    return this.maps.reduce((p, c) => c.map(p), seed);
  }

  calculateResult2() {
    const ranges: { start: number, end: number }[] = [];
    for (let i = 0; i < this.seeds.length; i = i + 2) {
      const start = Number(this.seeds[i]);
      const range = Number(this.seeds[i + 1]);
      ranges.push({start, end: start + range});
    }
    console.log(JSON.parse(JSON.stringify(ranges)));
    ranges.sort((a, b) => a.start - b.start);
    const combinedRanges = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
      const compareRange = combinedRanges[combinedRanges.length - 1];
      const currentRange = ranges[i];
      if (currentRange.start < compareRange.end && currentRange.end > compareRange.end) {
        compareRange.end = currentRange.end;
      } else if (currentRange.end > compareRange.end) {
        combinedRanges.push(currentRange);
      }
    }

    let minResult = Number.MAX_VALUE;
    combinedRanges.forEach(range => {
      console.log("start", range);
      for (let j = range.start; j < range.end; j++) {
          minResult = Math.min(minResult, this.getLocationForSeed(j));
      }
    })


     this.result2 = minResult;
  }
}

class Map {
  name: string
  maps: Mapping[] = [];

  // soil-to-fertilizer map:
  constructor(input: string, text: string[], position: number) {
    this.name = text[position].split(" ")[0];
    let j = 1;
    let nextLine = text[position + j];
    while (nextLine && nextLine.trim()) {
      this.maps.push(new Mapping(nextLine));
      j++;
      nextLine = text[position + j];
    }
  }

  public map(seed: number) {
    const mappings = this.maps.filter(m => m.doesMap(seed));
    if (mappings.length) {
      return mappings[0].map(seed);
    } else {
      return seed;
    }
  }
}

class Mapping {
  from: number;
  to: number;
  range: number;

  constructor(input: string) {
    const strings = input.split(" ");
    this.to = Number(strings[0]);
    this.from = Number(strings[1]);
    this.range = Number(strings[2]);
  }

  doesMap(input: number) {
    return input >= this.from && input < this.from + this.range;
  }

  map(input: number) {
    return input - this.from + this.to;
  }
}
