import { Component, OnInit } from '@angular/core';
import { inputDay1 } from './input';

const numberMapping = {
  one: 1 , two: 2 , three: 3, four:4  , five: 5, six: 6 , seven:7 , eight: 8, nine:9
};
@Component({
  selector: 'app-day1',
  standalone: true,
  imports: [],
  templateUrl: './day1.component.html',
  styleUrl: './day1.component.css',
})
export class Day1Component implements OnInit {
  text: string = inputDay1;
  result = -1;
  result2= -1;



  ngOnInit(): void {
    this.result = this.getResult1();
    this.result2 = this.getResult2();
  }

  private getResult1() {
    return this.combineNumbers(this.prepareInput())      ;
  }
  private combineNumbers(input: string[] ){
    return input.map((line) => {
      const letters = line.match(/[\d]/g);
      return Number(`${letters![0]}${letters!.pop()}`);
    })
      .reduce((a, b) => a + b)
  }

  private prepareInput() {
    return this.text
      .split('\n')
      .map((line) => line.trim());
  }

  private getResult2(){
    return this.combineNumbers(this.prepareInput().map(this.transformNumbers))
  }


  private transformNumbers(input: string): string{
    const inputBefore = input;
    for (let entry of Object.entries(numberMapping)){
      input = input.replace(new RegExp(entry[0], "g"), entry[0] +String(entry[1]) + entry[0]);
    }
    return input;
  }
}
