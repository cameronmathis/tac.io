import React from "react";

import * as GameDataService from "../services/game.service";
import useStore from "../Store";
import * as styles from "./css/Board.module.css";
import Grid from "./Grid";

function Board() {
  const EMPTY = "empty";
  const X = "x";
  const O = "o";

  const currentPlayer = useStore((state) => state.currentPlayer);
  const setCurrentPlayer = useStore((state) => state.setCurrentPlayer);
  const gameBoard = useStore((state) => state.gameBoard);
  const setGameBoard = useStore((state) => state.setGameBoard);

  function markBoard(gridNumber) {
    const y = Math.floor(gridNumber / 3);
    const x = gridNumber % 3;
    let updatedBoard = gameBoard;
    updatedBoard[y][x] = currentPlayer;
    setGameBoard(updatedBoard);
  }

  function updatePlayerTurn() {
    if (currentPlayer === X) {
      GameDataService.patchGame({ currentPlayer: O });
      setCurrentPlayer(O);
    }
    if (currentPlayer === O) {
      GameDataService.patchGame({ currentPlayer: X });
      setCurrentPlayer(X);
    }
  }

  function checkIfWon() {
    // Check horizontals
    for (let row in gameBoard) {
      let set = new Set(gameBoard[row]);
      if (set.size === 1) {
        if (gameBoard[row][0] !== EMPTY) return gameBoard[row][0];
      }
    }
    // Check verticals
    for (let column in gameBoard) {
      let set = new Set(
        gameBoard.map(function (value) {
          return value[column];
        })
      );
      if (set.size === 1) {
        if (gameBoard[0][column] !== EMPTY) return gameBoard[0][column];
      }
    }
    // Check diagonals
    let diagonalOne = new Set();
    diagonalOne.add(gameBoard[0][0]);
    diagonalOne.add(gameBoard[1][1]);
    diagonalOne.add(gameBoard[2][2]);
    if (diagonalOne.size === 1) {
      if (gameBoard[0][0] !== EMPTY) return gameBoard[0][0];
    }
    let diagonalTwo = new Set();
    diagonalTwo.add(gameBoard[0][2]);
    diagonalTwo.add(gameBoard[1][1]);
    diagonalTwo.add(gameBoard[2][0]);
    if (diagonalTwo.size === 1) {
      if (gameBoard[0][2] !== EMPTY) return gameBoard[0][2];
    }
  }

  const handleClick = (gridNumber) => {
    markBoard(gridNumber);
    updatePlayerTurn();
    const winner = checkIfWon();
    if (winner === X) console.log("X WON!");
    if (winner === O) console.log("O WON!");
  };

  return (
    <div className={styles.board}>
      {[...Array(9)].map((_x, i) => (
        <Grid key={i} gridNumber={i} handlePlay={handleClick} />
      ))}
    </div>
  );
}

export default Board;
