# SudokuBoard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## Idea

The algorithm I used for generation sudoku board is backtracking.
First of all, I generate a solution board by using backtracking. 
Secondly, I dig holes from the solution board. Every time a hole is made, I checked if the board is still solvable. If no, then stop and fill the hole.

I used the `console.log()` to post the solution board. For your convenience, you can check your browser console for solution.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


