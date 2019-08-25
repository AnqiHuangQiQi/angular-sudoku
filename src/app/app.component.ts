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

  checkRow (val, x, numbers) {
    for (let j = 0 ; j < 9 ; j++) {
      if (numbers[x][j] == val) {
        return false;
      }
    }
    return true;
  }
  checkCol (val, y, numbers) {
    for (let i = 0 ; i < 9 ; i++) {
      if (numbers[i][y] == val) {
        return false;
      }
    }
    return true;
  }
  checkPalace (val, x, y, numbers) {
    let middleCoords = [
      [1,1], [1,4], [1,7],
      [4,1], [4,4], [4,7],
      [7,1], [7,4], [7,7]
    ];
    let position = [1,1];
    for (let i = 1 ; i < 9 ; i++) {
      if (Math.abs(x-middleCoords[i][0]) + Math.abs(y-middleCoords[i][1]) < 
        Math.abs(x-position[0]) + Math.abs(y-position[1])) {
          position = middleCoords[i];
      }
    }

    for (let i = -1 ; i < 2 ; i++) {
      for (let j = -1 ; j < 2; j++) {
        if (numbers[position[0]+i][position[1]+j] == val) {
          return false;
        }
      }
    }
    return true;
  }
  isValid (val, i, numbers) {
    return this.checkRow(val, Math.floor(i/9), numbers) &&
      this.checkCol(val, i%9, numbers) &&
      this.checkPalace(val, Math.floor(i/9), i%9, numbers);
  }
  //i from 0 - 80
  backTrack(i, numbers) {
    let x = Math.floor(i/9), y = i%9;
    if (i == 81) {
      return true;
    } else if(numbers[x][y] != 0) {
      return this.backTrack(i+1, numbers);
    } else {
      let candidates = this.randomNineNumbers();
      for (let j = 0 ; j < 9 ; j ++) {
        if (this.isValid(candidates[j], i, numbers)) {
          numbers[x][y] = candidates[j];
          if (this.backTrack(i+1, numbers)) {
            return true;
          }
          numbers[x][y] = 0;
        }
      }
    }
  }

    //a backtracking way to get board
  getRandomBoard() {
    let numbers = new Array(9); 
   
    for(let i = 0; i < 9; i++) {
      numbers[i] = [0,0,0,0,0,0,0,0,0]; 
    }
  
    this.backTrack(0, numbers);
  
    return numbers;
  }
  //maybe I can create a tricky way, which is faster but less randomly
}
