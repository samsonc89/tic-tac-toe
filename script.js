"use strict";

const gridBox = document.querySelectorAll(".square");
const winnerMsg = document.querySelector("#winner-msg");
const playBtn = document.querySelector("#play-btn");
const selectionModal = document.querySelector("#selection-modal");
const choiceModal = document.querySelector("#choice-modal");
const player1NameElem = document.querySelector("#player1-name");
const player2NameElem = document.querySelector("#player2-name");
let playerChoice;

const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let whoGoesFirst;
  let currentPlayer;
  let winner = "";
  //HOW DO YOU SET A FUCNTION THAT SETS WINNER SO YOU CAN"T SET IT FROM OUTSIDE

  function clearBoard() {
    gameboard.board = ["", "", "", "", "", "", "", "", ""];
    displayController.updateBoard();
    gameboard.player1.resetPlayerArray();
    gameboard.player2.resetPlayerArray();
    whoGoesFirst =
      whoGoesFirst == gameboard.player1 ? gameboard.player2 : gameboard.player1;
    gameboard.currentPlayer = whoGoesFirst;
    gameboard.winner = "";
    winnerMsg.innerHTML = "";
    displayController.markSquare();
  }
  function changePlayer() {
    if (gameboard.currentPlayer == gameboard.player1) {
      gameboard.currentPlayer = gameboard.player2;
    } else {
      gameboard.currentPlayer = gameboard.player1;
    }
  }

  const Player = (position, symbol, name) => {
    const playerPosition = position;
    const playerSymbol = symbol;
    let playerName = name;
    let playerArray = [];
    let playerScore = 0;

    function computerMove() {
      let randomMove = Math.floor(Math.random() * 9);

      if (gameboard.board[randomMove] == "") {
        gameboard.board[randomMove] = "O";
        playerArray.push(randomMove);
        checkForWinner(playerArray);
        displayController.updateBoard();
        gameboard.changePlayer();
      } else computerMove();
    }

    function pickSquare() {
      //get the id and get the last digit and store into variable
      let boardIndex = Number(event.target.id[event.target.id.length - 1]);
      //get the index of the board array using the variable
      //check if square is blank, mark it
      if (gameboard.board[boardIndex] === "") {
        gameboard.board[boardIndex] = playerSymbol;
        playerArray.push(boardIndex);
        checkForWinner(playerArray);
        changePlayer();
        if (gameboard.currentPlayer.playerName == "Computer") {
          gameboard.currentPlayer.computerMove();
        }
      } else {
        return;
      }
      displayController.updateBoard();
    }

    function resetPlayerArray() {
      playerArray = [];
    }
    function resetPlayerScore() {
      this.playerScore = 0;
    }

    return {
      playerName,
      playerPosition,
      pickSquare,
      playerSymbol,
      resetPlayerArray,
      playerScore,
      resetPlayerScore,
      playerArray,
      computerMove,
    };
  };

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
    if (!gameboard.board.includes("")) {
      for (const winningCombination of winningCombinations) {
        // Every number in the winningCombination is also in the provided array
        if (!winningCombination.every((element) => array.includes(element))) {
          winnerMsg.innerHTML = "Tie Game!";
        }
      }
    }

    for (const winningCombination of winningCombinations) {
      // Every number in the winningCombination is also in the provided array
      if (winningCombination.every((element) => array.includes(element))) {
        gameboard.winner = gameboard.currentPlayer;
        gameboard.currentPlayer.playerScore++;
        document.querySelector(
          `#${gameboard.currentPlayer.playerPosition}-score`
        ).textContent = `${gameboard.currentPlayer.playerScore}`;
        winnerMsg.innerHTML = gameboard.currentPlayer.playerName + " Wins";
      }
    }
    // No complete match
    return false;
  }

  function reset() {
    gameboard.clearBoard();
    gameboard.currentPlayer = whoGoesFirst = gameboard.player1;
    playerChoice = "";
    gameboard.player1.resetPlayerScore();
    gameboard.player2.resetPlayerScore();
    selectionModal.style.display = "block";
    choiceModal.style.display = "block";
    document
      .querySelectorAll(".score-display")
      .forEach((score) => (score.innerHTML = 0));
  }

  const player1 = Player("player1", "X", "Player 1");
  const player2 = Player("player2", "O", "Player 2");

  whoGoesFirst = currentPlayer = player1;
  return {
    player1,
    player2,
    board,
    clearBoard,
    reset,
    currentPlayer,
    winner,
    changePlayer,
  };
})();

const displayController = (() => {
  function updateBoard() {
    gridBox.forEach((grid, i) => (grid.textContent = gameboard.board[i]));
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

  function markSquare() {
    if (gameboard.winner == "") {
      if (
        gameboard.currentPlayer.playerPosition == "player2" &&
        gameboard.currentPlayer.playerName == "Computer"
      ) {
        gameboard.currentPlayer.computerMove();
      } else {
        gameboard.currentPlayer.pickSquare();
      }
    }
  }
  return { updateBoard, playComputer, playPlayer, markSquare };
})();

gridBox.forEach((square) =>
  square.addEventListener("click", displayController.markSquare)
);

document
  .querySelectorAll(".change-players")
  .forEach((button) => button.addEventListener("click", gameboard.reset));

playBtn.addEventListener("click", (e) => {
  const player1Input = document.querySelector("#player1-name-input");
  const player2Input = document.querySelector("#player2-name-input");
  e.preventDefault();
  selectionModal.style.display = "none";
  player1NameElem.innerHTML = gameboard.player1.playerName =
    player1Input.value != "" ? player1Input.value : "Player 1";

  switch (playerChoice) {
    case "human":
      player2NameElem.innerHTML = gameboard.player2.playerName =
        player2Input.value != "" ? player2Input.value : "Player 2";

      break;
    case "computer":
      player2NameElem.innerHTML = "Computer";
      gameboard.player2.playerName = "Computer";
  }
  player1Input.value = player2Input.value = "";
});

function setComputer(mode) {
  //set computer to
  //easy mode - randomly select square
  //impossible - minmax logic
}
