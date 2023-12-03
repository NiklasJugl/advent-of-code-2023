import {Component, OnInit} from '@angular/core';
import {input2} from "./input2";

@Component({
  selector: 'app-day2',
  standalone: true,
  imports: [],
  templateUrl: './day2.component.html',
  styleUrl: './day2.component.css'
})
export class Day2Component implements OnInit {
  text: string[] = input2.split('\n')
    .map((line) => line.trim());
  result = -1;
  result2 = -1;
  games: Game[] = [];

  ngOnInit(): void {
    this.text.map(line => this.games.push(new Game(line)));
    console.log(this.games);
    const testSet = new Set("12 red, 13 green, 14 blue");
    this.result = this.games.filter(game => game.isPossible(testSet)).map(game => game.id).reduce((a, b) => a + b);

    this.result2 = this.games.map(game => game.calculteMinimum()).reduce((p, c) => p + c.calculatePower(), 0);
  }
}

class Game {
  id: number;
  sets: Set[];

  constructor(s: string) {
    const gameDefinition = s.split(":");
    this.id = Number(gameDefinition[0].substring(5));
    this.sets = gameDefinition[1].split(";").map(str => new Set(str));

  }

  isPossible(set: Set) {
    return this.sets.every(s => s.containedIn(set));
  }

  calculteMinimum(): Set {
    return this.sets.reduce((previousValue, currentValue) => {
      return new Set("", previousValue.cubes.map(cubes => currentValue.getMaximumCubes(cubes)));
    }, new Set("0 red, 0 blue, 0 green"));
  }
}

class Set {
  cubes: Cubes[] = [];

  // input: 1 red, 3 blue, 11 green
  constructor(s: string, cubes?: Cubes[]) {
    if (cubes) {
      this.cubes = cubes;
    } else {
      s.split(",").forEach(str => this.cubes.push(new Cubes(str)));
    }
  }

  containedIn(set: Set) {
    return this.cubes.every(c => c.isContained(set));
  }


  getMaximumCubes(cubesSearched: Cubes) {
    return this.cubes
      .filter(cubes => cubes.color === cubesSearched.color)
      .reduce((p, c) => p.number < c.number ? c : p, cubesSearched);
  }

  calculatePower() {
    return this.cubes.reduce((p, c) => p * c.number, 1);
  }
}

class Cubes {
  number: number;
  color: string;

  // input: 1 red
  constructor(s: string) {
    const split = s.trim().split(" ");
    this.number = Number(split[0]);
    this.color = split[1];
  }

  isContained(set: Set) {
    return set.cubes.some(cube => cube.color == this.color && this.number <= cube.number);
  }
}
