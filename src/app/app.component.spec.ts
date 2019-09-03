import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sudokuBoard'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('sudokuBoard');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sudoku');
  });

  //custom tests
  it('solution board created successfully', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const solutionBoard = app.getRandomBoard();
    let isCorrect = true;
    for (let i = 0 ; i < 9 ; i++) {
      for (let j = 0 ; j < 9 ; j++) {
        let val = solutionBoard[i][j];
        solutionBoard[i][j] = 0;
        if (!app.isValid(val, i*9+j, solutionBoard)) {
          isCorrect = false;
        }

        solutionBoard[i][j] = val;
      }
    }
    expect(isCorrect).toBe(true, 'solutionBoard obeys the sudoku rules');
  });

  it('verify test can detect invalid board', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const solutionBoard = app.getRandomBoard();
    let isWrong = false;
    //make board invalid by duplicating number within palace
    let val1 = solutionBoard[0][0];
    let val2 = solutionBoard[1][1];
    solutionBoard[0][0]=1;
    solutionBoard[1][1]=1;
    for (let i = 0 ; i < 9 ; i++) {
      for (let j = 0 ; j < 9 ; j++) {
        let val = solutionBoard[i][j];
        solutionBoard[i][j] = 0;
        if (!app.isValid(val, i*9+j, solutionBoard)) {
          isWrong = true;
          break;
        }
        solutionBoard[i][j] = val;
      }
    }
    solutionBoard[0][0] = val1;
    solutionBoard[1][1] = val2;
    //make board invalid by duplicating number within one row
    val1 = solutionBoard[0][0];
    val2 = solutionBoard[0][1];
    solutionBoard[0][0]=1;
    solutionBoard[0][1]=1;
    for (let i = 0 ; i < 9 ; i++) {
      for (let j = 0 ; j < 9 ; j++) {
        let val = solutionBoard[i][j];
        solutionBoard[i][j] = 0;
        if (!app.isValid(val, i*9+j, solutionBoard)) {
          isWrong = isWrong && true;
          break;
        }
        solutionBoard[i][j] = val;
      }
    }
    solutionBoard[0][0] = val1;
    solutionBoard[0][1] = val2;
    //make board invalid by duplicating number within one col
    val1 = solutionBoard[0][0];
    val2 = solutionBoard[1][0];
    solutionBoard[0][0]=1;
    solutionBoard[1][0]=1;
    for (let i = 0 ; i < 9 ; i++) {
      for (let j = 0 ; j < 9 ; j++) {
        let val = solutionBoard[i][j];
        solutionBoard[i][j] = 0;
        if (!app.isValid(val, i*9+j, solutionBoard)) {
          isWrong = isWrong && true;
          break;
        }
        solutionBoard[i][j] = val;
      }
    }
    solutionBoard[0][0] = val1;
    solutionBoard[1][0] = val2;

    expect(isWrong).toBe(true, 'invalid solution board detected');
  });

  //try to solve board
  it('solution board can be solved', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const solutionBoard = app.getRandomBoard();    //solution board
    let board = app.generateBoard(app.copyArray(solutionBoard));  //puzzle board

    let flag = true;

    let emptyCoords = [];
    for (let i = 0 ; i < 9 ; i++) {
      for (let j = 0 ; j < 9 ; j++) {
        if (board[i][j] == 0) {
          emptyCoords.push([i,j]);
        }
      }
    }

    flag = flag && app.solveBoard(board, emptyCoords);

    //check if solve algorithm gets correct answer
    for (let i = 0 ; i < 9 ; i++) {
      for (let j = 0 ; j < 9 ; j++) {
        let val = board[i][j];
        board[i][j] = 0;
        if (!app.isValid(val, i*9+j, board)) {
          flag = false;
        }

        board[i][j] = val;
      }
    }

    expect(flag).toBe(true, 'solutionBoard obeys the sudoku rules');
  });
});
