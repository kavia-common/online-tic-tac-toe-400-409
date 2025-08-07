import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /** Title for accessibility and page heading */
  title = 'Tic Tac Toe';

  /** The game board, a 3x3 matrix, each cell either 'X', 'O', or null */
  board: (null | 'X' | 'O')[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  /** Current player, either 'X' or 'O' */
  currentPlayer: 'X' | 'O' = 'X';

  /** Winner of the game, if any ('X', 'O', or null for ongoing/draw) */
  winner: null | 'X' | 'O' = null;

  /** Is the game a draw? */
  draw = false;

  /** Has a move been made for accessibility focus tracking */
  lastRowPlayed = -1;
  lastColPlayed = -1;

  /**
   * PUBLIC_INTERFACE
   * Handles a player clicking a cell.
   * @param row number: 0-2
   * @param col number: 0-2
   */
  makeMove(row: number, col: number): void {
    if (this.board[row][col] !== null || this.winner || this.draw) {
      return;
    }
    this.board[row][col] = this.currentPlayer;
    this.lastRowPlayed = row;
    this.lastColPlayed = col;

    if (this.checkWin(this.currentPlayer)) {
      this.winner = this.currentPlayer;
    } else if (this.checkDraw()) {
      this.draw = true;
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Checks for a win for the given player.
   */
  checkWin(player: 'X' | 'O'): boolean {
    const b = this.board;
    // Rows and columns
    for (let i = 0; i < 3; i++) {
      if (b[i][0] === player && b[i][1] === player && b[i][2] === player) return true;
      if (b[0][i] === player && b[1][i] === player && b[2][i] === player) return true;
    }
    // Diagonals
    if (b[0][0] === player && b[1][1] === player && b[2][2] === player) return true;
    if (b[0][2] === player && b[1][1] === player && b[2][0] === player) return true;
    return false;
  }

  /**
   * PUBLIC_INTERFACE
   * Checks if the game is a draw.
   */
  checkDraw(): boolean {
    return this.board.flat().every(cell => cell !== null) && !this.winner;
  }

  /**
   * PUBLIC_INTERFACE
   * Resets the game to the initial state.
   */
  resetGame(): void {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.currentPlayer = 'X';
    this.winner = null;
    this.draw = false;
    this.lastRowPlayed = -1;
    this.lastColPlayed = -1;
  }
}
