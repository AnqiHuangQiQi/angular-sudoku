import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sudokuBoard';

  numbers = this.getRandomBoard();

  generateRandom(head, tail) {
    let rd = Math.random();
    return Math.floor(rd * (tail - head) + head);
  }

  randomNineNumbers() {
    let numbers = new Array(9);
    for (let i = 0 ; i < 9 ; i++) {
      numbers[i] = i+1;
    }

    for (let i = 8 ; i >= 0 ; i--) {
      let exchangeIndex = this.generateRandom(0,i);
      let tmp = numbers[exchangeIndex];
      numbers[exchangeIndex] = numbers[i];
      numbers[i] = tmp;
    }

    return numbers;
  }

  //a backtracking way to get board
  getRandomBoard() {
    let numbers = new Array(9); 
 
    for(let i = 0; i < 9; i++) {
      numbers[i] = [0,0,0,0,0,0,0,0,0]; 
      numbers[i] = this.randomNineNumbers();
    }

    //backtracking

    return numbers;
  }

  //maybe I can create a tricky way, which is faster but less randomly
}
