# SudokuBoard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## Idea

The 3 main files that contain the code are :
app.component.ts
app.component.html
app.component.css

The algorithm I used for generating sudoku board is backtracking.
First of all, I start with the left-top corner cell. I generate a list of unordered numbers from 1 to 9. Then I pick up the 1st number and check if the rest board can get a valid result. If not, I will try the 2nd number from the unordered list.

Secondly, I dig holes from the solution board. Every time a hole is made, I checked if the board is still solvable. If no, then stop and fill the hole.

I used the `console.log()` to post the solution board. For your convenience, you can check your browser console for solution.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


