"use strict";

const gridBox = document.querySelectorAll(".square");
const winnerMsg = document.querySelector("#winner-msg");
const playBtn = document.querySelector("#play-btn");
const selectionModal = document.querySelector("#selection-modal");
const choiceModal = document.querySelector("#choice-modal");
const player1NameElem = document.querySelector("#player1-name");
const player2NameElem = document.querySelector("#player2-name");
let playerChoice;
let currentPlayer;
let whoGoesFirst;
let winner = "";
let board = ["", "", "", "", "", "", "", "", ""];

const gameboard = {};

function updateBoard() {
  gridBox.forEach((grid, i) => (grid.textContent = board[i]));
}

function hideChoiceModal() {
  choiceModal.style.display = "none";
}

function playPlayer() {
  playerChoice = "human";
  hideChoiceModal();
  document.querySelector("#computer-choices").style.display = "none";
  document.querySelector("#opponent-title").innerHTML = "Player 2";
  document.querySelector("#player2-name-input").style.display = "block";
}
function playComputer() {
  playerChoice = "computer";
  hideChoiceModal();
  document.querySelector("#opponent-title").innerHTML = "Computer";
  document.querySelector("#computer-choices").style.display = "block";
  document.querySelector("#player2-name-input").style.display = "none";
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
      winnerMsg.innerHTML = currentPlayer.playerName + " Wins";

      // `${
      //   winner.playerPosition[0].toUpperCase() +
      //   winner.playerPosition.substring(1)
      // } Wins`;
    }
  }
  // No complete match
  return false;
}

function clearBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  updateBoard();
  player1.resetPlayerArray();
  player2.resetPlayerArray();
  whoGoesFirst = whoGoesFirst == player1 ? player2 : player1;
  currentPlayer = whoGoesFirst;
  winner = "";
  winnerMsg.innerHTML = "";
}

function reset() {
  clearBoard();
  currentPlayer = whoGoesFirst = player1;
  playerChoice = "";
  player1.resetPlayerScore();
  player2.resetPlayerScore();
  selectionModal.style.display = "block";
  choiceModal.style.display = "block";
  document
    .querySelectorAll(".score-display")
    .forEach((score) => (score.innerHTML = 0));
}

const Player = (position, symbol, name) => {
  const playerPosition = position;
  const playerSymbol = symbol;
  let playerName = name;
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
  function resetPlayerScore() {
    playerScore = 0;
  }

  return {
    playerName,
    playerPosition,
    pickSquare,
    playerSymbol,
    resetPlayerArray,
    playerScore,
    resetPlayerScore,
  };
};
const player1 = Player("player1", "X", "Player 1");
const player2 = Player("player2", "O", "Player 2");

currentPlayer = whoGoesFirst = player1;

//go through each element in the winning array and check if it's within testArr

gridBox.forEach((square) => square.addEventListener("click", markSquare));

document
  .querySelectorAll(".change-players")
  .forEach((button) => button.addEventListener("click", reset));

playBtn.addEventListener("click", (e) => {
  const player1Input = document.querySelector("#player1-name-input");
  const player2Input = document.querySelector("#player2-name-input");
  e.preventDefault();
  selectionModal.style.display = "none";
  player1NameElem.innerHTML = player1.playerName =
    player1Input.value != "" ? player1Input.value : "Player 1";

  switch (playerChoice) {
    case "human":
      player2NameElem.innerHTML = player2.playerName =
        player2Input.value != "" ? player2Input.value : "Player 2";

      break;
    case "computer":
      player2NameElem.innerHTML = "Computer";
      player2.playerName = "Computer";
  }
  player1Input.value = player2Input.value = "";
});
