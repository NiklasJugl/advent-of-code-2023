import {Component, OnInit} from '@angular/core';
import {input6} from "./input6";

@Component({
  selector: 'app-day6',
  standalone: true,
  imports: [],
  templateUrl: './day6.component.html',
  styleUrl: './day6.component.css'
})
export class Day6Component implements OnInit {
  text: string[] = input6.split('\n')
    .map((line) => line.trim().replaceAll(/\s+/g, " "));
  result = -1;
  result2 = -1;

  races: Race[] = []

  ngOnInit(): void {
    this.calculateResult1();
    this.calculateResult2();

  }

  private calculateResult1() {
    const durations = this.text[0].split(" ");
    const records = this.text[1].split(" ");
    for (let i = 1; i < durations.length; i++) {
      this.races.push(new Race(Number(durations[i]), Number(records[i])));
    }

    this.result = this.races.map(r => r.calculateWinningOptions()).reduce((p, c) => p * c, 1);
  }

  private calculateResult2() {

    const durations = this.text[0].split(":");
    const records = this.text[1].split(":");
    const race = new Race(Number(durations[1].replaceAll(/\s/g,"")), Number(records[1].replaceAll(/\s/g,"")));
    console.log(race, durations, records);
    this.result2 = race.calculateWinningOptions();
  }
}

class Race {
  duration: number;
  record: number;

  constructor(duration: number, record: number) {
    this.duration = duration;
    this.record = record;
  }

  calculateWinningOptions() {
    let winningOptions = 0;
    for (let i = 1; i < this.duration; i++) {
      if (this.calculateDistance(i) > this.record) {
        winningOptions++;
      }
    }
    return winningOptions;
  }

  calculateDistance(chargingTime: number) {
    return (this.duration - chargingTime) * chargingTime;
  }
}
