"use strict";

const gameboard = (() => {
  const board = ["1", "", "", "1", "", "", "1", "", ""];
  function updateBoard() {
    for (let i = 0; i < board.length; i++) {
      document.querySelector(`#spot${i}`).textContent = board[i];
    }
  }
  let currentPlayer;
  return { board, updateBoard, currentPlayer };
})();

// console.log(gameboard);
gameboard.board[2] = "J";
// gameboard.updateBoard();

//player1.play(0) would change spot0

//if I set player within the Game object, I need to be able to call
// it outside as well
const Player = (name, symbol) => {
  const playerName = () => name;
  const playerSymbol = symbol;
  function pickSquare() {
    console.log(this);
    //get the id and get the last digit and store into variable
    let boardIndex = Number(this.id[this.id.length - 1]);

    //get the index of the board array using the variable
    //check if spot is blank, mark it
    if (gameboard.board[boardIndex] === "") {
      gameboard.board[boardIndex] = symbol;
      console.log(gameboard.board);
    } else {
      console.log("Invalid Spot");
    }
    gameboard.updateBoard();
    //if that position has a value, return

    //how do you get the current player?

    //switch players
  }

  //score

  //symbol
  return { playerName, pickSquare, playerSymbol };
};
const player1 = Player("input", "X");
const player2 = Player("Input", "O");

let currentPlayer = player1;

document.querySelectorAll(".spot").forEach((spot) => {
  spot.addEventListener("click", currentPlayer.pickSquare);
});
