"use strict";

const gridBox = document.querySelectorAll(".square");

let currentPlayer;
let winner = "";
let board = ["", "", "", "", "", "", "", "", ""];

function updateBoard() {
  gridBox.forEach((grid, i) => (grid.textContent = board[i]));
}

function changePlayer() {
  if (currentPlayer == player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

function markSquare() {
  if (winner === "") {
    currentPlayer.pickSquare();
  }
}

function checkForWinner(array) {
  const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // Each of the nested arrays in winningArray
  for (const winningCombination of winningCombinations) {
    // Every number in the winningCombination is also in the provided array
    if (winningCombination.every((element) => array.includes(element))) {
      winner = currentPlayer;
      currentPlayer.playerScore++;
      document.querySelector(
        `#${currentPlayer.playerPosition}-score`
      ).textContent = `${currentPlayer.playerScore}`;
      alert(`${winner.playerPosition} Wins`);
    }
  }
  // No complete match
  return false;
}

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  updateBoard();
  player1.resetPlayerArray();
  player2.resetPlayerArray();
  currentPlayer = player1;
  winner = "";
}

const Player = (position, symbol, alias = "None") => {
  const playerAlias = alias;
  const playerPosition = position;
  const playerSymbol = symbol;
  let playerArray = [];
  let playerScore = 0;

  function pickSquare() {
    //get the id and get the last digit and store into variable
    let boardIndex = Number(event.target.id[event.target.id.length - 1]);
    //get the index of the board array using the variable
    //check if square is blank, mark it
    if (board[boardIndex] === "") {
      board[boardIndex] = playerSymbol;
      playerArray.push(boardIndex);
      checkForWinner(playerArray);
      changePlayer();
    } else {
      console.log("Invalid square");
    }
    updateBoard();
  }
  function resetPlayerArray() {
    playerArray = [];
  }

  return {
    playerAlias,
    playerPosition,
    pickSquare,
    playerSymbol,
    resetPlayerArray,
    playerScore,
  };
};

const player1 = Player("player1", "X");
const player2 = Player("player2", "O");
currentPlayer = player1;

//go through each element in the winning array and check if it's within testArr

gridBox.forEach((square) => square.addEventListener("click", markSquare));
