import {Component, OnInit} from '@angular/core';
import {input2} from "../day2/input2";
import {input4} from "./input4";

@Component({
  selector: 'app-day4',
  standalone: true,
  imports: [],
  templateUrl: './day4.component.html',
  styleUrl: './day4.component.css'
})
export class Day4Component implements OnInit {
  text: string[] = input4.split('\n')
    .map((line) => line.trim());
  result = -1;
  result2 = -1;
  games: Game[] = [];

  ngOnInit(): void {
    this.result = this.text.map(line => new Game(line)).map(game => game.calculatePoints()).reduce((p, c) => p + c);

    const baseGames = this.text.map(line => new Game(line));
    for (let i = 0; i < this.text.length; i++) {
      const gameWins = baseGames[i].getCountWins();
      for (let j = i + 1 ; j < this.text.length && j <= i + gameWins ; j++) {
        baseGames[j].copies += baseGames[i].copies;
      }
    }
    console.log(baseGames);
    this.result2 = baseGames.map(game => game.copies).reduce((p, c) => p + c);
  }


}

class Game {
  name: string;
  winningNumbers: string[];
  cardNumbers: string[];
  copies = 1;

  //  Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  constructor(line: string) {
    const parts = line.split(":");
    this.name = parts[0];
    const numbers = parts[1].split("|");
    this.winningNumbers = numbers[0].trim().split(" ").filter(text => text.trim());
    this.cardNumbers = numbers[1].trim().split(" ").filter(text => text.trim());
  }

  calculatePoints(): number {
    const countWins = this.getCountWins();
    if (countWins > 0) {
      return Math.pow(2, countWins - 1);
    }
    return 0;
  }

  getCountWins() {
    return this.cardNumbers.filter(cardnumber => this.winningNumbers.includes(cardnumber)).length;
  }
}
