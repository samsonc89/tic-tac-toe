"use strict";

const gridBox = document.querySelectorAll(".spot");

const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  function updateBoard() {
    // for (let i = 0; i < board.length; i++) {
    //   document.querySelector(`#spot${i}`).textContent = board[i];
    // }
    gridBox.forEach((grid, i) => (grid.textContent = gameboard.board[i]));
  }
  let currentPlayer;
  let winner;

  function changePlayer() {
    if (gameboard.currentPlayer == player1) {
      gameboard.currentPlayer = player2;
    } else {
      gameboard.currentPlayer = player1;
    }
    console.log(gameboard.currentPlayer.playerName);
  }

  function markSquare() {
    gameboard.currentPlayer.pickSquare();
  }

  const Player = (name, symbol) => {
    const playerName = name;
    const playerSymbol = symbol;
    const playerArray = [];

    function pickSquare() {
      console.log(event.target);
      //get the id and get the last digit and store into variable
      let boardIndex = Number(event.target.id[event.target.id.length - 1]);

      //get the index of the board array using the variable
      //check if spot is blank, mark it
      if (gameboard.board[boardIndex] === "") {
        gameboard.board[boardIndex] = playerSymbol;
        //Add the index to array to check for winning combination
        playerArray.push(boardIndex);
      } else {
        console.log("Invalid Spot");
      }
      gameboard.updateBoard();
      console.log(checkForWinner(playerArray));
      gameboard.changePlayer();
    }

    return { playerName, pickSquare, playerSymbol, playerArray };
  };

  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");

  currentPlayer = player1;
  function init() {
    gameboard.winner = "";
    gameboard.currentPlayer = gameboard.player1;
    gameboard.board = ["", "", "", "", "", "", "", "", ""];
    gameboard.player1.playerArray = [];
    gameboard.player2.playerArray = [];
    gameboard.updateBoard();
    // clearBoard();
  }

  return {
    board,
    updateBoard,
    currentPlayer,
    markSquare,
    changePlayer,
    winner,
    player1,
    player2,
    init,
  };
})();

//
// document.querySelectorAll(".spot").forEach((spot) => {
//   spot.addEventListener("click", gameboard.markSquare);
// });
gridBox.forEach((spot) => spot.addEventListener("click", gameboard.markSquare));

//go through each element in the winning array and check if it's within testArr
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
  if (gameboard.winner != false)
    // Each of the nested arrays in winningArray
    for (const winningCombination of winningCombinations) {
      // Every number in the winningCombination is also in the provided array
      if (winningCombination.every((element) => array.includes(element))) {
        alert(
          ` ${
            gameboard.currentPlayer.playerName[0].toUpperCase() +
            gameboard.currentPlayer.playerName.substring(1)
          } Wins`
        );
        gameboard.winner = gameboard.currentPlayer;
        console.log(gameboard.winner);
      }
    }
  // No complete match
  return false;
}
