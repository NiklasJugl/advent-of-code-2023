import {Component, OnInit} from '@angular/core';
import {input8} from "../day8/input8";
import {input9} from "./input9";

@Component({
  selector: 'app-day9',
  standalone: true,
  imports: [],
  templateUrl: './day9.component.html',
  styleUrl: './day9.component.css'
})
export class Day9Component implements OnInit {
  text: number[][] = input9.split('\n')
    .map((line) => line.trim().replaceAll(/\s+/g, " "))
    .map(line => line.split(" ").map(value => Number(value)));
  result = -1;
  result2 = -1;

  ngOnInit(): void {

    this.calculateResult1();
    this.calculateResult2();

  }

  private calculateResult1() {
    let resultSum = 0;
    for (let i = 0; i < this.text.length; i++) {
      let currentArray = this.text[i];
      const allExtrapolations = [currentArray];
      while (!currentArray.every(e => e === 0)) {
        const nextArray = currentArray.reduce((previous, current, index) => {
          if (index > 0) {
            previous.push(current - currentArray[index - 1]);
          }
          return previous;
        }, [] as number[]);
        allExtrapolations.push(nextArray);
        currentArray = nextArray;
        console.log(allExtrapolations);
      }
      for(let j = allExtrapolations.length - 1; j >=0; j--){
        if(j === allExtrapolations.length - 1){
          allExtrapolations[j].push(0);
        }else{
          const extrapolation = allExtrapolations[j];
          const above = allExtrapolations[j+1];
          extrapolation.push( extrapolation[extrapolation.length - 1] + above[above.length - 1]);
        }
      }
      resultSum += allExtrapolations[0][allExtrapolations[0].length -1 ];
    }
    this.result = resultSum;
  }

  private calculateResult2() {
    let resultSum = 0;
    for (let i = 0; i < this.text.length; i++) {
      let currentArray = this.text[i];
      const allExtrapolations = [currentArray];
      while (!currentArray.every(e => e === 0)) {
        const nextArray = currentArray.reduce((previous, current, index) => {
          if (index > 0) {
            previous.push(current - currentArray[index - 1]);
          }
          return previous;
        }, [] as number[]);
        allExtrapolations.push(nextArray);
        currentArray = nextArray;
        console.log(allExtrapolations);
      }


      for(let j = allExtrapolations.length - 1; j >=0; j--){
        if(j === allExtrapolations.length - 1){
          allExtrapolations[j].unshift(0);
        }else{
          const extrapolation = allExtrapolations[j];
          const above = allExtrapolations[j+1];
          extrapolation.unshift (    extrapolation[0] - above[0] );
        }
      }
      resultSum += allExtrapolations[0][0];
    }
    this.result2 = resultSum;
  }
}
