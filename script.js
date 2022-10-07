"use strict";

const gameboard = (() => {
  const board = ["1", "", "", "1", "", "", "1", "", ""];

  function updateBoard() {
    for (let i = 0; i < board.length; i++) {
      document.querySelector(`#spot${i}`).textContent = board[i];
    }
  }
  return { board, updateBoard };
})();

// console.log(gameboard);
// gameboard.board[2] = "J";
// gameboard.updateBoard();
