import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sudokuBoard';

  numbers = this.getRandomBoard();    //solution
  board = this.generateBoard(this.copyArray(this.numbers)); //puzzle board

  copyArray (array) {
    let copy = new Array();
    for (let i = 0 ; i < 9 ; i ++) {
      copy[i] = new Array();
      for (let j = 0 ; j < 9 ; j++) {
        copy[i][j] = array[i][j];
      }
    }
    return copy;
  }

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
  
    this.backTrack(0, numbers);  //this is the solution numbers
    return numbers;
  }

  //make holes from a board
  makeHoles (board, emptyCoords) {
    let index = this.generateRandom(0, 80);
    let orgValue = board[Math.floor(index/9)][index%9];

    let x = Math.floor(index/9);
    let y = index%9;

    board[x][y] = 0;
    emptyCoords.push([x,y]);

    if (this.isSolvable(this.copyArray(board),emptyCoords)) {
      return board;
    } else {
      emptyCoords.pop();
      board[x][y] = orgValue;
      return board;
    }
  }

  //check if solvable
  isSolvable (board, emptyCoords) {
    let noZero = true;

    for (let l = 0 ; l < emptyCoords.length ; l++) {
      let i = emptyCoords[l][0], j = emptyCoords[l][1];
        if (board[i][j] == 0) {
          for (let k = 1 ; k <= 9 ; k++) {
            if (this.isValid(k, i*9+j, board)) {
              board[i][j] = k;
              if (this.isSolvable(this.copyArray(board), emptyCoords)) {
                return true;
              }
              board[i][j] = 0;
            }
          }
          return false;
        }
    }
    return true;
  }

  generateBoard(board) {
    let time = 0;
    let emptyCoords = [];
    while (time <= 55) {
      board = this.makeHoles(board, emptyCoords);
      time++;
    }
    return board;
  }
}
