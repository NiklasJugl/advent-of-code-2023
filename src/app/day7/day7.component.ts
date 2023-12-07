import {Component, OnInit} from '@angular/core';
import {input7} from "./input7";

@Component({
  selector: 'app-day7',
  standalone: true,
  imports: [],
  templateUrl: './day7.component.html',
  styleUrl: './day7.component.css'
})
export class Day7Component implements OnInit {
  text: string[] = input7.split('\n')
    .map((line) => line.trim().replaceAll(/\s+/g, " "));
  result = -1;
  result2 = -1;


  ngOnInit(): void {
    this.calculateResult1();
    // this.calculateResult2();

  }

  private calculateResult1() {
    const hands = this.text.map(t => new Hand(t));

    console.log(hands.sort((a, b) => a.compareTo(b)).filter(c => c.cards.includes("J")));
    this.result = hands.sort((a, b) => a.compareTo(b)).map((hand, index) => hand.bid * (index + 1)).reduce((p, c) => p + c)
  }


}

class Hand {
  cards: string[] = [];
  bid: number;
  value: number;
  highCardValue: string;

  // 32T3K 765
  constructor(input: string) {
    const strings = input.split(" ");
    this.cards = strings[0].split("");
    this.bid = Number(strings[1]);
    this.value = this.getValue();
    this.highCardValue = this.getHighcardValue();
  }

  compareTo(b: Hand) {
    if (this.value > b.value) {
      return 1;
    } else if (this.value < b.value) {
      return -1;
    } else {
      if (this.highCardValue > b.highCardValue) {
        return 1;
      } else if (this.highCardValue < b.highCardValue) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  getValue() {
    if (this.isFive()) {
      return Type.FIVE;
    } else if (this.isFour()) {
      return Type.FOUR;
    } else if (this.isFullHouse()) {
      return Type.FULLHOUSE;
    } else if (this.isThree()) {
      return Type.THREE;
    } else if (this.isTwoPair()) {
      return Type.TWOPAIR;
    } else if (this.isPair()) {
      return Type.PAIR;
    } else {
      return Type.HIGHCARD;
    }
  }

  // Order: A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2.
  getHighcardValue() {
    return this.cards.map(c => {
      switch (c) {
        case "A":
          return "ZZ";
        case "K":
          return "YY";
        case "Q":
          return "XX";
        // case "J":
        //   return "WW";
        case "T":
          return "VV";
        case "9":
          return "UU";
        case "8":
          return "TT";
        case "7":
          return "SS";
        case "6":
          return "RR";
        case "5":
          return "QQ";
        case "4":
          return "PP";
        case "3":
          return "OO";
        case "2":
          return "NN";
        case "J":
          return "AA";
        default:
          throw new Error(c);
      }
    }).join("");
  }

  isFive() {
    return this.getDistinctCards().length === 1 || (this.cards.includes("J") && this.isFourOriginal()) || (this.countSimilarCards("J") >= 2 && this.getDistinctCards().length === 2);
  }

  isFour() {
    return this.isFourOriginal() || (this.isThreeOriginal() && this.countSimilarCards("J") === 1) || (this.getDistinctCards().length === 3 && this.countSimilarCards("J") === 2) || (this.countSimilarCards("J") === 3);
  }

  private isFourOriginal() {
    const countFirstCard = this.countSimilarCards(this.cards[0]);
    return this.getDistinctCards().length === 2 && (countFirstCard === 1 || countFirstCard === 4);
  }

  isFullHouse() {
    const countJokers = this.countSimilarCards("J");
    return this.isFullHouseOriginal() || (this.isTwoPairOriginal() && (countJokers >= 1 ));
  }

  private isFullHouseOriginal() {
    const countFirstCard = this.countSimilarCards(this.cards[0]);
    return this.getDistinctCards().length === 2 && (countFirstCard === 2 || countFirstCard === 3);
  }

  isThree() {
    return this.isThreeOriginal() || (this.isTwoOriginal() && this.countSimilarCards("J") >= 1);
  }

  private isThreeOriginal() {
    return this.getDistinctCards().length === 3 && (this.countSimilarCards(this.cards[0]) === 3 || this.countSimilarCards(this.cards[1]) === 3 || this.countSimilarCards(this.cards[2]) === 3);
  }

  isTwoPair() {
    return this.isTwoPairOriginal() || (this.isTwoOriginal() && this.countSimilarCards("J") === 1);
  }

  private isTwoPairOriginal() {
    const countFirstCard = this.countSimilarCards(this.cards[0]);
    return this.getDistinctCards().length === 3 && (countFirstCard === 1 || countFirstCard === 2);
  }

  isPair() {
    return this.isTwoOriginal() || this.countSimilarCards("J") === 1;
  }

  private isTwoOriginal() {
    return this.getDistinctCards().length === 4;
  }

  private countSimilarCards(card: string) {
    return this.cards.filter(c => c === card).length;
  }

  private getDistinctCards() {
    const distinctCards: string[] = []
    this.cards.forEach(c => {
      if (!distinctCards.includes(c)) {
        distinctCards.push(c);
      }
    });
    return distinctCards;
  }
}

enum Type {
  FIVE = 9,
  FOUR= 8,
  FULLHOUSE = 7,
  THREE = 6,
  TWOPAIR = 5,
  PAIR = 4,
  HIGHCARD = 3
}
