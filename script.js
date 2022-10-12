"use strict";

const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  function updateBoard() {
    for (let i = 0; i < board.length; i++) {
      document.querySelector(`#spot${i}`).textContent = board[i];
    }
  }
  let currentPlayer;

  function markSquare() {
    gameboard.currentPlayer.pickSquare();
  }
  return { board, updateBoard, currentPlayer, markSquare };
})();

function changePlayer() {
  if (gameboard.currentPlayer == player1) {
    gameboard.currentPlayer = player2;
  } else {
    gameboard.currentPlayer = player1;
  }
  console.log(gameboard.currentPlayer.playerName);
}

const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;
  function pickSquare() {
    console.log(event.target);
    //get the id and get the last digit and store into variable
    let boardIndex = Number(event.target.id[event.target.id.length - 1]);

    //get the index of the board array using the variable
    //check if spot is blank, mark it
    if (gameboard.board[boardIndex] === "") {
      gameboard.board[boardIndex] = playerSymbol;
      console.log(gameboard.board);
    } else {
      console.log("Invalid Spot");
    }
    gameboard.updateBoard();
    changePlayer();
  }

  return { playerName, pickSquare, playerSymbol };
};
const player1 = Player("player1", "A");
const player2 = Player("player2", "O");

gameboard.currentPlayer = player1;

document.querySelectorAll(".spot").forEach((spot) => {
  spot.addEventListener("click", gameboard.markSquare);
});

//How should I set the current player
